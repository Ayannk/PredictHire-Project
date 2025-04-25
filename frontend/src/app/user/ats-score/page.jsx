'use client';
import React, { useState, useEffect } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import styles from './page.module.css';
import axios from 'axios';

const ATSScorePage = () => {
  const [formData, setFormData] = useState({
    jobDescription: '',
    fullName: '',
    aboutMe: '',
    skills: [],
    workExperience: [],
    education: [],
    certifications: []
  });

  const [newSkill, setNewSkill] = useState('');
  const [newWorkExperience, setNewWorkExperience] = useState('');
  const [newEducation, setNewEducation] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleAddWorkExperience = () => {
    if (newWorkExperience.trim()) {
      setFormData(prev => ({
        ...prev,
        workExperience: [...prev.workExperience, newWorkExperience.trim()]
      }));
      setNewWorkExperience('');
    }
  };

  const handleAddEducation = () => {
    if (newEducation.trim()) {
      setFormData(prev => ({
        ...prev,
        education: [...prev.education, newEducation.trim()]
      }));
      setNewEducation('');
    }
  };

  const handleAddCertification = () => {
    if (newCertification.trim()) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()]
      }));
      setNewCertification('');
    }
  };

  const handleRemoveSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveWorkExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveEducation = (index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveCertification = (index) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const calculateScore = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/calculate-ats-score', formData);
      setScore(response.data.score);
      setFeedback(response.data.feedback);
    } catch (error) {
      console.error('Error calculating score:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">ATS Score Calculator</h1>

          {/* Job Description Section */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-2">Job Description</label>
            <textarea
              className="w-full h-40 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              name="jobDescription"
              placeholder="Paste the job description here..."
              value={formData.jobDescription}
              onChange={handleChange}
            />
          </div>

          {/* Personal Information */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              name="aboutMe"
              placeholder="Professional Summary"
              value={formData.aboutMe}
              onChange={handleChange}
              className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Skills Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.skills.map((skill, index) => (
                <div key={index} className="bg-indigo-100 px-3 py-1 rounded-full flex items-center">
                  <span className="text-indigo-800">{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(index)}
                    className="ml-2 text-indigo-600 hover:text-indigo-800"
                  >
                    <IoCloseOutline />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleAddSkill}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
          </div>

          {/* Work Experience Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Work Experience</h2>
            <div className="space-y-2 mb-3">
              {formData.workExperience.map((exp, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>{exp}</span>
                  <button
                    onClick={() => handleRemoveWorkExperience(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <IoCloseOutline />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add work experience"
                value={newWorkExperience}
                onChange={(e) => setNewWorkExperience(e.target.value)}
                className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleAddWorkExperience}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Education</h2>
            <div className="space-y-2 mb-3">
              {formData.education.map((edu, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>{edu}</span>
                  <button
                    onClick={() => handleRemoveEducation(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <IoCloseOutline />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add education"
                value={newEducation}
                onChange={(e) => setNewEducation(e.target.value)}
                className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleAddEducation}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
          </div>

          {/* Calculate Score Button */}
          <button
            onClick={calculateScore}
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Calculating...' : 'Calculate ATS Score'}
          </button>

          {/* Score Display */}
          {score !== null && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Your ATS Score</h3>
                <div className="text-5xl font-bold text-indigo-600 mb-4">{score}%</div>
                {feedback && (
                  <div className="mt-4 text-left">
                    <h4 className="font-semibold mb-2">Feedback:</h4>
                    <ul className="list-disc list-inside space-y-2">
                      {Object.entries(feedback).map(([key, value]) => (
                        <li key={key} className="text-gray-700">
                          <span className="font-medium">{key}:</span> {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ATSScorePage;