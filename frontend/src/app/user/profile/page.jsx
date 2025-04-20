// // App.js or a component file
// 'use client';
// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [resumeData, setResumeData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//     };

//     const handleUpload = async () => {
//         if (!selectedFile) {
//             alert('Please select a file.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('resume', selectedFile);

//         try {
//             setLoading(true);
//             setError(null);
//             const response = await axios.post('http://localhost:5000/resume/upload-resume', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             setResumeData(response.data.data); // Assuming the backend sends back structured resume data
//             alert(response.data.message);

//         } catch (err) {
//             console.error('Error uploading file:', err);
//             setError(err.message || 'Failed to upload and process resume.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-200 to-purple-300 p-6'>
//             <div className='max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg text-center'>

//             <h2 className='text-2xl font-bold text-gray-800 mb-4'>Is your resume good enough?</h2>
//             <p className='text-gray-600 mb-6'>Drop your resume here or choose a file. PDF & DOCX only</p>
//             <div className='border-2 border-dashed border-gray-400 p-6 rounded-lg w-full text-center'>
//             <input type="file" accept='.pdf,.doc,.docx' onChange={handleFileChange} className='hidden' id='fileInput' />
//             <label htmlFor="fileInput" className='cursor-pointer text-gray-500'>Click to upload or drag and drop</label>
//             </div>

//             <button onClick={handleUpload} disabled={loading} className='px-6 mt-4 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600'>
//                 {loading ? 'Uploading...' : 'Upload Your Resume'}
//             </button>
//             {error && <p style={{ color: 'red' }}>Error: {error}</p>}

//             {resumeData && ( 
//                 <div>
//                     <p className='text-gray-700 mb-4'>Selected File: {resume.name}</p>
//                     <h2>Parsed Resume Data:</h2>
//                     <pre>{JSON.stringify(resumeData, null, 2)}</pre> {/* Display the JSON data */}
//                 </div>
//             )}
//             </div>
//         </div>
        
//     );
// }

// export default App;