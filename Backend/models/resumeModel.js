const {Schema, model} = require('../connection');

const resumeSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  education: [String],
  experience: [String],
  skills: [String],
  rawText: String, // optional
});

module.exports = model('resume', resumeSchema);
