const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const Resume = require('../models/resumeModel');

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
                text: `Extract structured resume information (name, email, phone, education, experience, skills) from the following text:\n\n${fileContent}`,
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
    console.log(resultText.split('json')[1].slice(0, -3).trim());

    const structuredData = JSON.parse(resultText.split('json')[1]);
    const savedResume = await Resume.create(structuredData);

    res.json({ message: 'Resume saved successfully', savedResume });
  } catch (error) {
    console.error("Error processing resume:", error.response?.data || error.message);
    res.status(500).json({ message: 'Error parsing or saving resume' });
  }
});

router.get('/getall', (req, res) => {
  Resume.find()
    .then((result) => {
      res.status(200).json(result);
    }).catch((err) => {
      console.log(err);
      res.status(500).json(result);
    });
})

module.exports = router;