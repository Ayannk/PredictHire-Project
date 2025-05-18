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
const verifyToken = require('../middlewares/verifyToken');

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
router.post('/create', verifyToken, async (req, res) => {
  try {
    const { templateId, resumeData } = req.body;
    const userId = req.user.id;

    // Create a new resume document
    const resume = new Resume({
      userId,
      templateId,
      name: resumeData.personalInfo.fullName,
      email: resumeData.personalInfo.email,
      phone: resumeData.personalInfo.phone,
      education: resumeData.education,
      experience: resumeData.experience,
      skills: resumeData.skills,
      projects: resumeData.projects,
      originalContent: resumeData,
      status: 'active'
    });

    // Save resume to database
    await resume.save();

    // Generate PDF based on template
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.276, 841.890]); // A4 size

    // Get template layout based on templateId
    const templateLayout = getTemplateLayout(templateId);
    
    // Apply template layout and add content
    await applyTemplateToPage(page, resumeData, templateLayout);

    // Save PDF
    const pdfBytes = await pdfDoc.save();
    const pdfPath = path.join(__dirname, '..', 'uploads', `${resume._id}.pdf`);
    await fs.writeFile(pdfPath, pdfBytes);

    // Update resume with file path
    resume.filePath = pdfPath;
    await resume.save();

    res.status(201).json({
      message: 'Resume created successfully',
      resumeId: resume._id
    });
  } catch (error) {
    console.error('Error creating resume:', error);
    res.status(500).json({ message: 'Error creating resume' });
  }
});

// Helper function to get template layout
function getTemplateLayout(templateId) {
  const templates = {
    1: {
      // Modern template
      headerHeight: 150,
      sidebarWidth: 200,
      sidebarColor: rgb(0.9, 0.9, 0.9),
      mainTextColor: rgb(0.2, 0.2, 0.2),
      accentColor: rgb(0.2, 0.4, 0.8)
    },
    2: {
      // Creative template
      headerHeight: 200,
      sidebarWidth: 0,
      mainTextColor: rgb(0.2, 0.2, 0.2),
      accentColor: rgb(0.8, 0.3, 0.3)
    },
    3: {
      // Classic template
      headerHeight: 120,
      sidebarWidth: 0,
      mainTextColor: rgb(0, 0, 0),
      accentColor: rgb(0.4, 0.4, 0.4)
    },
    4: {
      // Technical template
      headerHeight: 100,
      sidebarWidth: 180,
      sidebarColor: rgb(0.2, 0.2, 0.2),
      mainTextColor: rgb(0.2, 0.2, 0.2),
      accentColor: rgb(0.2, 0.6, 0.4)
    }
  };
  
  return templates[templateId] || templates[1];
}

// Helper function to apply template to PDF page
async function applyTemplateToPage(page, resumeData, layout) {
  const { width, height } = page.getSize();
  const fontSize = 12;
  
  // Add personal info section
  page.drawText(resumeData.personalInfo.fullName, {
    x: layout.sidebarWidth + 50,
    y: height - 50,
    size: 24,
    color: layout.mainTextColor
  });

  // Add contact info
  page.drawText(resumeData.personalInfo.email, {
    x: layout.sidebarWidth + 50,
    y: height - 80,
    size: fontSize,
    color: layout.mainTextColor
  });

  // Continue adding other sections...
  // This is a basic implementation - you'll need to expand this
  // to handle all resume sections and proper formatting
}

router.post('/rank-resumes', upload.array('resumes', 10), async (req, res) => {
  try {
    const { jobDescription } = req.body;
    if (!jobDescription) {
      return res.status(400).json({ message: 'Job description is required' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No resume files uploaded' });
    }

    const processedResumes = [];

    // Process each resume
    for (const file of req.files) {
      const filePath = file.path;
      const mimeType = file.mimetype;
      let fileContent = '';

      // Extract text content from different file types
      if (mimeType === 'application/pdf') {
        const pdfBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(pdfBuffer);
        fileContent = pdfData.text;
      } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const docxBuffer = fs.readFileSync(filePath);
        const docxData = await mammoth.extractRawText({ buffer: docxBuffer });
        fileContent = docxData.value;
      } else {
        fileContent = fs.readFileSync(filePath, 'utf-8');
      }

      // Call Gemini API for analyzing resume against job description
      const geminiResponse = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
        {
          contents: [
            {
              parts: [
                {
                  text: `Analyze how well this resume matches the job description and provide a score out of 100. 
                  Also provide key matching points and missing skills.
                  Return the response in JSON format with these fields:
                  - score: number (0-100)
                  - matchingPoints: array of strings
                  - missingSkills: array of strings
                  - analysis: string (brief explanation)

                  Job Description:
                  ${jobDescription}

                  Resume Content:
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

      // Parse the response
      const resultText = geminiResponse.data.candidates[0]?.content?.parts[0]?.text || '';
      let analysisData;

      try {
        const jsonMatch = resultText.match(/```json\n([\s\S]*?)\n```/) || 
                         resultText.match(/```\n([\s\S]*?)\n```/) ||
                         resultText.match(/{[\s\S]*?}/);
        
        if (jsonMatch) {
          analysisData = JSON.parse(jsonMatch[0].replace(/```json\n|```\n|```/g, ''));
        } else {
          throw new Error('Could not parse JSON response');
        }
      } catch (error) {
        analysisData = {
          score: 0,
          matchingPoints: [],
          missingSkills: [],
          analysis: 'Error analyzing resume'
        };
      }

      processedResumes.push({
        fileName: file.originalname,
        ...analysisData
      });

      // Clean up uploaded file
      fs.unlink(filePath, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    // Sort resumes by score in descending order
    const rankedResumes = processedResumes.sort((a, b) => b.score - a.score);

    res.json({
      message: 'Resumes ranked successfully',
      totalResumes: rankedResumes.length,
      rankings: rankedResumes
    });

  } catch (error) {
    console.error("Error ranking resumes:", error.response?.data || error.message);
    res.status(500).json({ message: 'Error processing and ranking resumes' });
  }
});

router.post('/rank-selected', async (req, res) => {
  try {
    const { resumeIds, jobDescription } = req.body;
    
    // Fetch selected resumes from database
    const resumes = await Resume.find({
      '_id': { $in: resumeIds }
    });

    const rankingResults = [];

    // Analyze each resume against the job description
    for (const resume of resumes) {
      // Call Gemini API for analysis
      const geminiResponse = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
        {
          contents: [
            {
              parts: [
                {
                  text: `Analyze how well this resume matches the job description and provide a score out of 100. 
                  Also provide key matching points and missing skills.
                  Return the response in JSON format with these fields:
                  - score: number (0-100)
                  - matchingPoints: array of strings
                  - missingSkills: array of strings

                  Job Description:
                  ${jobDescription}

                  Resume Content:
                  ${resume.rawText || JSON.stringify(resume)}`,
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

      const resultText = geminiResponse.data.candidates[0]?.content?.parts[0]?.text || '';
      let analysisData;

      try {
        const jsonMatch = resultText.match(/```json\n([\s\S]*?)\n```/) || 
                         resultText.match(/```\n([\s\S]*?)\n```/) ||
                         resultText.match(/{[\s\S]*?}/);
        
        if (jsonMatch) {
          analysisData = JSON.parse(jsonMatch[0].replace(/```json\n|```\n|```/g, ''));
        } else {
          throw new Error('Could not parse JSON response');
        }
      } catch (error) {
        analysisData = {
          score: 0,
          matchingPoints: [],
          missingSkills: [],
        };
      }

      rankingResults.push({
        ...analysisData,
        name: resume.name,
        email: resume.email,
        resumeId: resume._id
      });
    }

    // Sort results by score
    rankingResults.sort((a, b) => b.score - a.score);

    res.json({
      message: 'Resumes ranked successfully',
      rankings: rankingResults
    });

  } catch (error) {
    console.error("Error ranking resumes:", error);
    res.status(500).json({ message: 'Error processing and ranking resumes' });
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

router.get('/view/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Check if we have a stored PDF file
    const pdfPath = path.join(__dirname, '..', 'uploads', `${resume._id}.pdf`);
    if (fs.existsSync(pdfPath)) {
      // Stream the PDF file
      const stat = fs.statSync(pdfPath);
      res.setHeader('Content-Length', stat.size);
      res.setHeader('Content-Type', 'application/pdf');
      const readStream = fs.createReadStream(pdfPath);
      readStream.pipe(res);
    } else {
      // If no PDF exists, return the raw data
      res.json(resume);
    }
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).json({ message: 'Error retrieving resume' });
  }
});

router.get('/view/data/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Create a nicely formatted HTML page
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>${resume.name}'s Resume</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background: #f5f5f5;
            }
            .resume {
                background: white;
                padding: 40px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .section {
                margin-bottom: 30px;
            }
            h1 {
                color: #2c3e50;
                margin-bottom: 10px;
            }
            h2 {
                color: #34495e;
                border-bottom: 2px solid #3498db;
                padding-bottom: 5px;
                margin-bottom: 15px;
            }
            .contact-info {
                color: #7f8c8d;
                margin-bottom: 20px;
            }
            .skill {
                display: inline-block;
                background: #e8f4fc;
                padding: 5px 10px;
                border-radius: 15px;
                margin: 5px;
                color: #2980b9;
            }
            .experience-item, .education-item {
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <div class="resume">
            <div class="section">
                <h1>${resume.name}</h1>
                <div class="contact-info">
                    <div>${resume.email}</div>
                    <div>${resume.phone}</div>
                </div>
            </div>

            <div class="section">
                <h2>Skills</h2>
                <div>
                    ${resume.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
                </div>
            </div>

            <div class="section">
                <h2>Experience</h2>
                ${resume.experience.map(exp => `
                    <div class="experience-item">
                        <h3>${exp.title}</h3>
                        <p>${exp.description}</p>
                    </div>
                `).join('')}
            </div>

            <div class="section">
                <h2>Education</h2>
                ${resume.education.map(edu => `
                    <div class="education-item">
                        <h3>${edu.degree}</h3>
                        <div>${edu.institution}</div>
                        <div>${edu.dates}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    </body>
    </html>
    `;

    // Send the HTML response
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).json({ message: 'Error retrieving resume' });
  }
});

module.exports = router;