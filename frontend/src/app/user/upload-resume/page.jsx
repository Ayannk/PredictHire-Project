'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageResume() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [resumeData, setResumeData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [jobDescriptions, setJobDescriptions] = useState([]);
    const [newJobDescription, setNewJobDescription] = useState({ title: '', description: '' });
    const [dragActive, setDragActive] = useState(false);


    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('resume', selectedFile);

        try {
            setLoading(true);
            setError(null);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setResumeData(response.data.savedResume);
            setSelectedFile(null);
            // Reset file input
            const fileInput = document.getElementById('fileInput');
            if (fileInput) fileInput.value = '';

        } catch (err) {
            console.error('Error uploading file:', err);
            setError(err.message || 'Failed to upload and process resume.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddJobDescription = () => {
        if (newJobDescription.title && newJobDescription.description) {
            setJobDescriptions([...jobDescriptions, { ...newJobDescription, id: Date.now() }]);
            setNewJobDescription({ title: '', description: '' });
        }
    };

    const handleDeleteJobDescription = (id) => {
        setJobDescriptions(jobDescriptions.filter(job => job.id !== id));
    };

    return (
        <div className="bg-blue-50 w-full mt-16 mx-auto px-4 sm:px-6 lg:px-20 py-8 sm:py-14">
            <div className="max-w-7xl mx-auto">
                {/* Resume Upload Section */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full sm:w-4/5 lg:w-2/3 xl:w-1/2 mx-auto">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Resume Checker</h2>
                    
                    <div 
                        className={`border-2 border-dashed rounded-lg p-4 sm:p-8 text-center ${
                            dragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            id="fileInput"
                            onChange={handleFileChange}
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                        />
                        <label
                            htmlFor="fileInput"
                            className="cursor-pointer text-gray-600 hover:text-indigo-600"
                        >
                            <div className="mb-4">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <p className="text-sm">
                                Drag and drop your resume here, or <span className="text-indigo-600">browse</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-2">Supports PDF, DOC, DOCX</p>
                        </label>
                    </div>

                    {selectedFile && (
                        <div className="mt-4 flex flex-col items-center">
                            <p className="text-sm text-gray-600 text-center break-all px-2">{selectedFile.name}</p>
                            <button
                                onClick={handleUpload}
                                disabled={loading}
                                className="mt-2 w-full sm:w-2/3 md:w-1/2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {loading ? 'Uploading...' : 'Upload Resume'}
                            </button>
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm sm:text-base">
                            {error}
                        </div>
                    )}
                </div>

                {/* Resume Data Display */}
                {resumeData && (
                    <div className="mt-8 bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Parsed Resume Data</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <div className="space-y-3">
                                <h3 className="font-semibold mb-2">Personal Information</h3>
                                <div className="space-y-2 text-sm sm:text-base">
                                    <p><span className="font-medium">Name:</span> {resumeData.name}</p>
                                    <p><span className="font-medium">Email:</span> 
                                        <span className="break-all"> {resumeData.email}</span>
                                    </p>
                                    <p><span className="font-medium">Phone:</span> {resumeData.phone}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {resumeData.skills?.map((skill, index) => (
                                        <span 
                                            key={index} 
                                            className="px-2 sm:px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs sm:text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <h3 className="font-semibold mb-2">Education</h3>
                                <div className="space-y-2">
                                    {resumeData.education?.map((edu, index) => (
                                        <div key={index} className="p-2 sm:p-3 bg-gray-50 rounded-lg">
                                            <p className="font-medium text-sm sm:text-base">{edu.degree}</p>
                                            <p className="text-xs sm:text-sm text-gray-600">{edu.institution}</p>
                                            <p className="text-xs sm:text-sm text-gray-500">{edu.dates}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <h3 className="font-semibold mb-2">Experience</h3>
                                <div className="space-y-2">
                                    {resumeData.experience?.map((exp, index) => (
                                        <div key={index} className="p-2 sm:p-3 bg-gray-50 rounded-lg">
                                            <p className="font-medium text-sm sm:text-base">{exp.title}</p>
                                            <p className="text-xs sm:text-sm text-gray-600 whitespace-pre-line">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageResume;