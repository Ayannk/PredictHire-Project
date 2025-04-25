const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const Resume = require('../models/resumeModel');
const { PDFDocument, rgb } = require('pdf-lib');
const path = require('path');
const fsPromises = require('fs').promises;

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const mimeType = req.file.mimetype;

    let fileContent = '';

    if (mimeType === 'application/pdf') {
      const pdfBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(pdfBuffer);
      fileContent = pdfData.text;
    } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const docxBuffer = fs.readFileSync(filePath);
      const docxData = await mammoth.extractRawText({ buffer: docxBuffer });
      fileContent = docxData.value;
    } else {
      fileContent = fs.readFileSync(filePath, 'utf-8'); // fallback for .txt
    }

    // Call Gemini API for parsing
    const geminiResponse = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        contents: [
          {
            parts: [
              {
                text: `Extract structured resume information from the following text and return it in JSON format with these fields:
                - name: string
                - email: string
                - phone: string
                - education: array of objects with {degree: string, institution: string, dates: string}
                - experience: array of objects with {title: string, description: string}
                - skills: array of strings

                Text to parse:
                ${fileContent}`,
              },
            ],
          },
        ],
      },
      {
        params: {
          key: process.env.GEMINI_API_KEY,
        },
      }
    );

    // Fix the JSON parsing from Gemini response
    const resultText = geminiResponse.data.candidates[0]?.content?.parts[0]?.text || '';
    console.log('Raw response:', resultText);
    
    let structuredData;
    
    try {
      // Try to extract JSON from the response
      const jsonMatch = resultText.match(/```json\n([\s\S]*?)\n```/) || 
                        resultText.match(/```\n([\s\S]*?)\n```/) ||
                        resultText.match(/{[\s\S]*?}/);
                        
      if (jsonMatch) {
        structuredData = JSON.parse(jsonMatch[0].replace(/```json\n|```\n|```/g, ''));
      } else {
        // Fallback: create structured data manually
        const educationList = extractArray(resultText, 'education');
        const experienceList = extractArray(resultText, 'experience');

        structuredData = {
          name: extractField(resultText, 'name') || 'Unknown',
          email: extractField(resultText, 'email') || extractEmail(resultText) || 'Unknown',
          phone: extractField(resultText, 'phone') || extractPhone(resultText) || 'Unknown',
          education: educationList.map(item => ({
            degree: item,
            institution: 'Not specified',
            dates: 'Not specified'
          })),
          experience: experienceList.map(item => ({
            title: 'Work Experience',
            description: item
          })),
          skills: extractArray(resultText, 'skills'),
          rawText: fileContent
        };
      }
    } catch (parseError) {
      console.error('Error parsing structured data:', parseError);
      // Create a fallback structure if parsing fails
      structuredData = {
        name: 'Parse Error',
        email: 'Unknown',
        phone: 'Unknown',
        education: [],
        experience: [],
        skills: [],
        rawText: fileContent
      };
    }

    // Save to database
    const savedResume = await Resume.create(structuredData);

    // Clean up the uploaded file
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    res.json({ message: 'Resume saved successfully', savedResume });
  } catch (error) {
    console.error("Error processing resume:", error.response?.data || error.message);
    res.status(500).json({ message: 'Error parsing or saving resume' });
  }
});

// Helper functions for extracting information
function extractField(text, fieldName) {
  const regex = new RegExp(`["']?${fieldName}["']?\\s*:\\s*["']?([^,"'\\}\\]]+)["']?`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : null;
}

function extractEmail(text) {
  const match = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  return match ? match[0] : null;
}

function extractPhone(text) {
  const match = text.match(/(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
  return match ? match[0] : null;
}

function extractArray(text, fieldName) {
  // Try to find JSON array format first
  const arrayRegex = new RegExp(`["']?${fieldName}["']?\\s*:\\s*(\\[.*?\\])`, 'is');
  const arrayMatch = text.match(arrayRegex);
  
  if (arrayMatch) {
    try {
      return JSON.parse(arrayMatch[1]);
    } catch (e) {
      // If parsing fails, try to extract as comma-separated list
      const items = arrayMatch[1].replace(/[\[\]"']/g, '').split(',');
      return items.map(item => item.trim()).filter(item => item.length > 0);
    }
  }
  
  // Fallback: look for list format with bullets or numbers
  const listItems = [];
  const lines = text.split('\n');
  let inSection = false;
  
  for (let line of lines) {
    line = line.trim();
    
    if (line.toLowerCase().includes(fieldName.toLowerCase()) && !inSection) {
      inSection = true;
      continue;
    }
    
    if (inSection) {
      if (line.match(/^[\s]*$/) || /^[A-Za-z]+\s*:/.test(line)) {
        // Empty line or new section heading
        inSection = false;
      } else if (line.match(/^[\s]*[-•*]|^\d+\./) || line.length > 0) {
        // Bullet point or numbered item or any non-empty line in the section
        listItems.push(line.replace(/^[\s]*[-•*]|^\d+\.[\s]*/, '').trim());
      }
    }
  }
  
  return listItems.length > 0 ? listItems : [];
}

// Template-based resume creation endpoint
router.post('/create', async (req, res) => {
  try {
    const { templateId, resumeData } = req.body;

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size

    // Get font
    const font = await pdfDoc.embedFont(PDFDocument.Standard.Helvetica);
    const boldFont = await pdfDoc.embedFont(PDFDocument.Standard.HelveticaBold);

    // Set drawing context
    const { width, height } = page.getSize();
    let currentY = height - 50; // Start from top with margin
    const margin = 50;
    const lineHeight = 20;

    // Helper function to write text
    const writeText = (text, fontSize = 12, isTitle = false) => {
      page.drawText(text, {
        x: margin,
        y: currentY,
        size: fontSize,
        font: isTitle ? boldFont : font,
        color: rgb(0, 0, 0),
      });
      currentY -= lineHeight;
    };

    // Write personal information
    writeText(resumeData.personalInfo.fullName, 24, true);
    writeText(resumeData.personalInfo.email, 12);
    writeText(resumeData.personalInfo.phone, 12);
    writeText(resumeData.personalInfo.location, 12);
    currentY -= lineHeight;

    // Write summary
    if (resumeData.summary) {
      writeText('Professional Summary', 16, true);
      writeText(resumeData.summary, 12);
      currentY -= lineHeight;
    }

    // Write experience
    writeText('Work Experience', 16, true);
    resumeData.experience.forEach(exp => {
      writeText(`${exp.title} at ${exp.company}`, 14, true);
      writeText(`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, 12);
      writeText(exp.description, 12);
      currentY -= lineHeight;
    });

    // Write skills
    writeText('Skills', 16, true);
    if (resumeData.skills.technical) {
      writeText('Technical Skills:', 14, true);
      writeText(resumeData.skills.technical, 12);
    }
    if (resumeData.skills.soft) {
      writeText('Soft Skills:', 14, true);
      writeText(resumeData.skills.soft, 12);
    }

    // Generate PDF bytes
    const pdfBytes = await pdfDoc.save();

    // Send the PDF as response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    res.send(Buffer.from(pdfBytes));

  } catch (error) {
    console.error('Error creating resume:', error);
    res.status(500).json({ error: 'Failed to create resume' });
  }
});

router.get('/getall', (req, res) => {
  Resume.find()
    .then((result) => {
      res.status(200).json(result);
    }).catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;