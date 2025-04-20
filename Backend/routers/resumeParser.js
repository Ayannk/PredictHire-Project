
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors'); // Enable CORS for cross-origin requests
const pdfParse = require('pdf-parse'); // For PDF parsing
const fs = require('fs'); // File system for handling uploaded files

const resumeParser = express();
const port = process.env.PORT || 5000;

resumeParser.use(cors()); // Enable CORS
resumeParser.use(express.json()); // Parse JSON request bodies
const Resume = require('../models/resumeModel');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store uploaded files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

const upload = multer({ storage: storage });


// API Endpoint for Resume Upload and Parsing
resumeParser.post('/api/upload', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No resume file uploaded' });
    }

    const filePath = req.file.path;

    // 1. Parse the PDF (or other supported format)
    let dataBuffer = fs.readFileSync(filePath);
    let data = await pdfParse(dataBuffer);
    const parsedText = data.text;

    // 2. Extract Information (Example - improve this significantly!)
    // **IMPORTANT:**  This is a VERY basic example. You'll need to use sophisticated methods to
    // accurately extract information like name, email, skills, etc. Use NLP libraries, regular expressions,
    // and domain-specific knowledge.

    const nameRegex = /(?:Name:|Author:)\s*([A-Za-z\s]+)/i; // Very basic name extraction
    const nameMatch = parsedText.match(nameRegex);
    const name = nameMatch ? nameMatch[1].trim() : 'N/A';

    const emailRegex = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g;
    const emailMatch = parsedText.match(emailRegex);
    const email = emailMatch ? emailMatch[0].trim() : 'N/A';  //Pick first email

    //Very simple regex to find phone number
    const phoneRegex = /(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g;
    const phoneMatch = parsedText.match(phoneRegex);
    const phone = phoneMatch ? phoneMatch[0].trim() : 'N/A'; //Pick first phone

    //Very basic skills example
    const skillKeywords = ["javascript", "react", "node", "python", "java", "sql", "mongodb"];
    const skillsFound = skillKeywords.filter(skill => parsedText.toLowerCase().includes(skill));

    // 3. Create a new Resume document in MongoDB
    const newResume = new Resume({
      name: name,
      email: email,
      phone: phone,
      skills: skillsFound,
      education: education,
      experience: experience,
      parsedText: parsedText, // Store the entire parsed text for later analysis
      //Populate other fields as required
    });

    await newResume.save();

    // 4. Delete the uploaded file (optional - for cleaning up storage)
    fs.unlinkSync(filePath); // Remove the uploaded file

    res.status(201).json({ message: 'Resume parsed and saved successfully!', resumeId: newResume._id });

  } catch (error) {
    console.error('Error parsing resume:', error);
    res.status(500).json({ message: 'Error parsing resume', error: error.message });
  }
});

//GET all resumes endpoint
resumeParser.get('/api/resumes', async (req, res) => {
    try {
        const resumes = await Resume.find();
        res.status(200).json(resumes);
    } catch (error) {
        console.error('Error getting resumes:', error);
        res.status(500).json({ message: 'Error getting resumes', error: error.message });
    }
});


module.exports = resumeParser;
