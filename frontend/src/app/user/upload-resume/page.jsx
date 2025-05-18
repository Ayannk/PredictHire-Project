'use client';
import React, { useState, useEffect } from 'react'; // Fixed typo in useEffect
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
            const response = await axios.post('http://localhost:5000/api/resume/upload', formData, {
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
        <div className="bg-blue-50 w-full mt-16 mx-auto px-20 py-14 ">
            <div className="grid md:grid-cols-1 gap-8 ">
                {/* Resume Upload Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Resume Checker</h2>
                    
                    <div 
                        className={`border-2 border-dashed rounded-lg p-8 text-center ${
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
                            <p className="text-sm text-gray-600">Selected: {selectedFile.name}</p>
                            <button
                                onClick={handleUpload}
                                disabled={loading}
                                className="mt-2 w-1/2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {loading ? 'Uploading...' : 'Upload Resume'}
                            </button>
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}
                </div>

                {/* Job Descriptions Section */}
                {/* <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Job Descriptions</h2>
                    
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Job Title"
                            value={newJobDescription.title}
                            onChange={(e) => setNewJobDescription({ ...newJobDescription, title: e.target.value })}
                            className="w-full mb-2 p-2 border rounded-lg"
                        />
                        <textarea
                            placeholder="Job Description"
                            value={newJobDescription.description}
                            onChange={(e) => setNewJobDescription({ ...newJobDescription, description: e.target.value })}
                            className="w-full h-32 p-2 border rounded-lg mb-2"
                        />
                        <button
                            onClick={handleAddJobDescription}
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                        >
                            Add Job Description
                        </button>
                    </div>

                    <div className="space-y-4">
                        {jobDescriptions.map((job) => (
                            <div key={job.id} className="p-4 border rounded-lg">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold">{job.title}</h3>
                                    <button
                                        onClick={() => handleDeleteJobDescription(job.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <p className="text-sm text-gray-600">{job.description}</p>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>

            {/* Resume Data Display */}
            {resumeData && (
                <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Parsed Resume Data</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-2">Personal Information</h3>
                            <p><span className="font-medium">Name:</span> {resumeData.name}</p>
                            <p><span className="font-medium">Email:</span> {resumeData.email}</p>
                            <p><span className="font-medium">Phone:</span> {resumeData.phone}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {resumeData.skills?.map((skill, index) => (
                                    <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold mb-2">Education</h3>
                            <div className="space-y-2">
                                {resumeData.education?.map((edu, index) => (
                                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                        <p className="font-medium">{edu.degree}</p>
                                        <p className="text-sm text-gray-600">{edu.institution}</p>
                                        <p className="text-sm text-gray-500">{edu.dates}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold mb-2">Experience</h3>
                            <div className="space-y-2">
                                {resumeData.experience?.map((exp, index) => (
                                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                        <p className="font-medium">{exp.title}</p>
                                        <p className="text-sm text-gray-600 whitespace-pre-line">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageResume;