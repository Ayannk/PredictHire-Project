const {Schema, model} = require('../connection');

const resumeSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  education: [{
    degree: String,
    institution: String,
    dates: String
  }],
  experience: [{
    title: String,
    description: String
  }],
  skills: [String],
  rawText: String,
  originalFile: String,  // Path to the original uploaded PDF file
  mimeType: String      // MIME type of the original file
});

module.exports = model('resume', resumeSchema);