'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

const ResumeBuilder = () => {
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');

  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      portfolio: ''
    },
    education: [{
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: ''
    }],
    experience: [{
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }],
    skills: [''],
    projects: [{
      name: '',
      description: '',
      technologies: '',
      link: ''
    }]
  });

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value
      }
    }));
  };

  const handleArrayFieldChange = (section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayField = (section) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], getEmptyObject(section)]
    }));
  };

  const removeArrayField = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const getEmptyObject = (section) => {
    switch(section) {
      case 'education':
        return { degree: '', institution: '', location: '', startDate: '', endDate: '', gpa: '' };
      case 'experience':
        return { title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' };
      case 'projects':
        return { name: '', description: '', technologies: '', link: '' };
      default:
        return {};
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          templateId,
          resumeData: formData
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Handle success - redirect to preview or download
        window.location.href = `/user/resume-preview?id=${data.resumeId}`;
      }
    } catch (error) {
      console.error('Error creating resume:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Create Your Resume</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.personalInfo.fullName}
                onChange={handlePersonalInfoChange}
                className="input-field"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.personalInfo.email}
                onChange={handlePersonalInfoChange}
                className="input-field"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.personalInfo.phone}
                onChange={handlePersonalInfoChange}
                className="input-field"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.personalInfo.address}
                onChange={handlePersonalInfoChange}
                className="input-field"
              />
              <input
                type="url"
                name="linkedin"
                placeholder="LinkedIn URL"
                value={formData.personalInfo.linkedin}
                onChange={handlePersonalInfoChange}
                className="input-field"
              />
              <input
                type="url"
                name="portfolio"
                placeholder="Portfolio URL"
                value={formData.personalInfo.portfolio}
                onChange={handlePersonalInfoChange}
                className="input-field"
              />
            </div>
          </div>

          {/* Education */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Education</h2>
              <button
                type="button"
                onClick={() => addArrayField('education')}
                className="text-blue-600 hover:text-blue-800"
              >
                + Add Education
              </button>
            </div>
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-6 border-b pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => handleArrayFieldChange('education', index, 'degree', e.target.value)}
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => handleArrayFieldChange('education', index, 'institution', e.target.value)}
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={edu.location}
                    onChange={(e) => handleArrayFieldChange('education', index, 'location', e.target.value)}
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="GPA"
                    value={edu.gpa}
                    onChange={(e) => handleArrayFieldChange('education', index, 'gpa', e.target.value)}
                    className="input-field"
                  />
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={edu.startDate}
                    onChange={(e) => handleArrayFieldChange('education', index, 'startDate', e.target.value)}
                    className="input-field"
                  />
                  <input
                    type="date"
                    placeholder="End Date"
                    value={edu.endDate}
                    onChange={(e) => handleArrayFieldChange('education', index, 'endDate', e.target.value)}
                    className="input-field"
                  />
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField('education', index)}
                    className="text-red-600 hover:text-red-800 mt-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Experience */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Experience</h2>
              <button
                type="button"
                onClick={() => addArrayField('experience')}
                className="text-blue-600 hover:text-blue-800"
              >
                + Add Experience
              </button>
            </div>
            {formData.experience.map((exp, index) => (
              <div key={index} className="mb-6 border-b pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={exp.title}
                    onChange={(e) => handleArrayFieldChange('experience', index, 'title', e.target.value)}
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleArrayFieldChange('experience', index, 'company', e.target.value)}
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={exp.location}
                    onChange={(e) => handleArrayFieldChange('experience', index, 'location', e.target.value)}
                    className="input-field"
                  />
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => handleArrayFieldChange('experience', index, 'current', e.target.checked)}
                      className="mr-2"
                    />
                    <label>Current Position</label>
                  </div>
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChange={(e) => handleArrayFieldChange('experience', index, 'startDate', e.target.value)}
                    className="input-field"
                  />
                  <input
                    type="date"
                    placeholder="End Date"
                    value={exp.endDate}
                    onChange={(e) => handleArrayFieldChange('experience', index, 'endDate', e.target.value)}
                    disabled={exp.current}
                    className="input-field"
                  />
                </div>
                <textarea
                  placeholder="Job Description"
                  value={exp.description}
                  onChange={(e) => handleArrayFieldChange('experience', index, 'description', e.target.value)}
                  className="input-field mt-4 h-32 w-full"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField('experience', index)}
                    className="text-red-600 hover:text-red-800 mt-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => {
                      const newSkills = [...formData.skills];
                      newSkills[index] = e.target.value;
                      setFormData(prev => ({ ...prev, skills: newSkills }));
                    }}
                    className="input-field"
                    placeholder="Add a skill"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newSkills = formData.skills.filter((_, i) => i !== index);
                        setFormData(prev => ({ ...prev, skills: newSkills }));
                      }}
                      className="text-red-600 hover:text-red-800 ml-2"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, skills: [...prev.skills, ''] }))}
                className="text-blue-600 hover:text-blue-800"
              >
                + Add Skill
              </button>
            </div>
          </div>

          {/* Projects */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Projects</h2>
              <button
                type="button"
                onClick={() => addArrayField('projects')}
                className="text-blue-600 hover:text-blue-800"
              >
                + Add Project
              </button>
            </div>
            {formData.projects.map((project, index) => (
              <div key={index} className="mb-6 border-b pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={project.name}
                    onChange={(e) => handleArrayFieldChange('projects', index, 'name', e.target.value)}
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="Technologies Used"
                    value={project.technologies}
                    onChange={(e) => handleArrayFieldChange('projects', index, 'technologies', e.target.value)}
                    className="input-field"
                  />
                  <input
                    type="url"
                    placeholder="Project Link"
                    value={project.link}
                    onChange={(e) => handleArrayFieldChange('projects', index, 'link', e.target.value)}
                    className="input-field"
                  />
                </div>
                <textarea
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) => handleArrayFieldChange('projects', index, 'description', e.target.value)}
                  className="input-field mt-4 h-32 w-full"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField('projects', index)}
                    className="text-red-600 hover:text-red-800 mt-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Resume
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .input-field {
          @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500;
        }
      `}</style>
    </div>
  );
};

export default ResumeBuilder;