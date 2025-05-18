const ResumeMatcher = () => {
  // ... existing state ...
  
  const handleViewResume = (resumeId) => {
    // Open resume PDF in new tab
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/view/${resumeId}`, '_blank');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Resume Match Results</h2>
      
      {/* ... existing search and filter UI ... */}
      
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
                <button
                  onClick={() => handleViewResume(resume._id)}
                  className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Resume
                </button>
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