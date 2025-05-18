"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ResumeMatcher = () => {
  const [existingResumes, setExistingResumes] = useState([]);
  const [selectedResumeIds, setSelectedResumeIds] = useState([]);
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rankingResults, setRankingResults] = useState(null);  const handleViewResume = async (resumeId) => {
    try {
      // First try to get the PDF version
      const pdfResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/view/${resumeId}`);
      
      if (pdfResponse.headers.get('content-type') === 'application/pdf') {
        // If it's a PDF, display it
        const blob = await pdfResponse.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      } else {
        // If no PDF available, open the formatted HTML view
        window.open(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/view/data/${resumeId}`, '_blank');
      }
    } catch (error) {
      console.error('Error viewing resume:', error);
      alert('Error viewing resume. Please try again.');
    }
  };
  const handleSendEmail = (candidate) => {
    try {
      // Get admin token and decode it to get admin data
      const adminToken = localStorage.getItem('admin');
      if (!adminToken) {
        alert('Please login as admin first');
        return;
      }

      // Get admin data from token
      const tokenData = jwtDecode(adminToken);
      const adminName = tokenData.name || 'Hiring Manager';

      // Create email template
      const emailSubject = 'Interview Request';
      const emailBody = `Dear ${candidate.name},

After carefully reviewing your resume for the position, we are impressed with your qualifications and would like to discuss this opportunity further.

Key strengths we noticed:
${candidate.matchingPoints.map(point => `- ${point}`).join('\n')}

Score: ${candidate.score}%

We would like to schedule an interview to discuss your experience in more detail.

Best regards,
${adminName}`;

      // Create mailto URL
      const mailtoUrl = `mailto:${candidate.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Open default email client
      window.location.href = mailtoUrl;

    } catch (error) {
      console.error('Error preparing email:', error);
      alert('Failed to prepare email. Please try again.');
    }
  };

  // Fetch existing resumes on component mount
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/getall`);
        setExistingResumes(response.data);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    };
    fetchResumes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!jobDescription || selectedResumeIds.length === 0) {
      alert('Please select resumes and provide a job description');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/resume/rank-selected`,
        {
          resumeIds: selectedResumeIds,
          jobDescription
        }
      );
      setRankingResults(response.data.rankings);
    } catch (error) {
      console.error('Error ranking resumes:', error);
      alert('Error processing resumes');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 mt-16 bg-sky-50">
      <h2 className="text-2xl font-bold mb-6">Resume Ranking Tool</h2>

      <form onSubmit={handleSubmit} className="mb-8 space-y-6">
        <div className="space-y-2">
          <label className="block font-medium">Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full h-32 p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the job description here..."
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Select Resumes to Analyze</label>
          <div className="max-h-60 overflow-y-auto border rounded-md p-4 bg-white">
            {existingResumes.map((resume) => (
              <div key={resume._id} className="flex items-center space-x-3 py-2">
                <input
                  type="checkbox"
                  id={resume._id}
                  checked={selectedResumeIds.includes(resume._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedResumeIds([...selectedResumeIds, resume._id]);
                    } else {
                      setSelectedResumeIds(selectedResumeIds.filter(id => id !== resume._id));
                    }
                  }}
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor={resume._id} className="flex-1 cursor-pointer">
                  <div className="font-medium">{resume.name}</div>
                  <div className="text-sm text-gray-500">{resume.email}</div>
                </label>
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-600">
            {selectedResumeIds.length} resume(s) selected
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Resumes'}
        </button>
      </form>

      {/* Ranking Results */}
      {rankingResults && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Ranking Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rankingResults.map((result, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 border">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-lg">
                    Rank #{index + 1}
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    {result.score}%
                  </span>
                </div>
                
                <div className="mb-4">
                  <p className="font-medium text-gray-700">Candidate:</p>
                  <p className="text-sm">{result.name}</p>
                  <p className="text-sm text-gray-500">{result.email}</p>
                </div>

                <div className="mb-4">
                  <p className="font-medium text-gray-700">Matching Points:</p>
                  <ul className="list-disc list-inside text-sm">
                    {result.matchingPoints.map((point, i) => (
                      <li key={i} className="text-gray-600">{point}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-medium text-gray-700">Missing Skills:</p>
                  <ul className="list-disc list-inside text-sm">
                    {result.missingSkills.map((skill, i) => (
                      <li key={i} className="text-gray-600">{skill}</li>
                    ))}
                  </ul>
                </div>                <div className="flex justify-between mt-4 pt-4 border-t">
                  <button
                    onClick={() => handleViewResume(result.resumeId)}
                    className="px-4 py-2 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    View Resume
                  </button>
                  <button
                    onClick={() => handleSendEmail(result)}
                    className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Send Email
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeMatcher;
