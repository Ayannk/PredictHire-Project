"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResumeMatcher = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('all');

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/getall`)
      .then(res => {
        console.log(res.data);
        setMatches(res.data);
        setFilteredMatches(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    // Filter resumes based on search query and filter criteria
    let results = matches;
    
    if (searchQuery) {
      results = results.filter(resume => 
        resume.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resume.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resume.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filterCriteria !== 'all') {
      results = results.filter(resume => {
        const skills = resume.skills || [];
        return skills.some(skill => skill.toLowerCase().includes(filterCriteria.toLowerCase()));
      });
    }
    
    setFilteredMatches(results);
  }, [searchQuery, filterCriteria, matches]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Resume Match Results</h2>
      
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <input
            type="text"
            placeholder="Search by resume summary, name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-full md:w-1/3">
          <select 
            value={filterCriteria} 
            onChange={(e) => setFilterCriteria(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Skills</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="react">React</option>
            <option value="node">Node.js</option>
            <option value="java">Java</option>
            <option value="sql">SQL</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((resume, index) => (
            <div key={resume._id || index} className="bg-white rounded-lg shadow-md h-full border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-xl font-semibold">{resume.name || 'Unnamed Resume'}</h3>
                <p className="text-sm text-gray-500">{resume.email}</p>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <h4 className="font-semibold mb-1">Summary:</h4>
                  <p className="text-sm text-gray-700">{resume.summary || 'No summary available'}</p>
                </div>
                {resume.skills && resume.skills.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-1">Skills:</h4>
                    <div className="flex flex-wrap gap-1">
                      {resume.skills.map((skill, i) => (
                        <span key={i} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {resume.matchScore && (
                  <div className="mt-4">
                    <h4 className="font-semibold">Match Score:</h4>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{width: `${resume.matchScore}%`}}
                      ></div>
                    </div>
                    <p className="text-right text-sm">{resume.matchScore}%</p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            <p>No resumes found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeMatcher;
