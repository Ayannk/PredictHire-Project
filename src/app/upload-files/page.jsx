"use client";
import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';

const UploadFiles = () => {

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) toast.error('NO file selected');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'Predicthire');
        formData.append('cloud_name', 'dblgninag');

        axios.post("https://api.cloudinary.com/v1_1/dblgninag/image/upload", formData)
        .then((result) => {
            toast.success('File uploaded successfully');
        }).catch((err) => {
            toast.error('File upload failed');
        });
        
    }
return (
    <div>
        <input type="file" onChange={handleFileUpload} />
    </div>
)
}

export default UploadFiles;