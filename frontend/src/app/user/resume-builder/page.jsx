'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ResumeBuilder() {
    const searchParams = useSearchParams();
    const templateId = searchParams.get('template');
    const [formData, setFormData] = useState({
        personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            location: '',
            linkedin: '',
            portfolio: ''
        },
        summary: '',
        experience: [{
            title: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
        }],
        education: [{
            degree: '',
            school: '',
            location: '',
            graduationDate: '',
            gpa: '',
            highlights: ''
        }],
        skills: {
            technical: '',
            soft: ''
        },
        certifications: [{
            name: '',
            issuer: '',
            date: '',
            id: ''
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

    const addExperience = () => {
        setFormData(prev => ({
            ...prev,
            experience: [...prev.experience, {
                title: '',
                company: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                description: ''
            }]
        }));
    };

    const handleExperienceChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            experience: prev.experience.map((exp, i) => 
                i === index ? { ...exp, [field]: value } : exp
            )
        }));
    };

    const removeExperience = (index) => {
        setFormData(prev => ({
            ...prev,
            experience: prev.experience.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/resume/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    templateId,
                    resumeData: formData
                }),
            });
            
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `resume-${formData.personalInfo.fullName}.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error('Error generating resume:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Create Your Resume</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Information */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.personalInfo.fullName}
                                        onChange={handlePersonalInfoChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.personalInfo.email}
                                        onChange={handlePersonalInfoChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.personalInfo.phone}
                                        onChange={handlePersonalInfoChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.personalInfo.location}
                                        onChange={handlePersonalInfoChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Professional Summary */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Professional Summary</h2>
                            <textarea
                                name="summary"
                                value={formData.summary}
                                onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                                rows={4}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Write a compelling summary of your professional background..."
                            />
                        </div>

                        {/* Work Experience */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b pb-2">
                                <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
                                <button
                                    type="button"
                                    onClick={addExperience}
                                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Add Experience
                                </button>
                            </div>
                            
                            {formData.experience.map((exp, index) => (
                                <div key={index} className="space-y-4 p-4 bg-gray-50 rounded-lg relative">
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => removeExperience(index)}
                                            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                                        >
                                            Remove
                                        </button>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Job Title</label>
                                            <input
                                                type="text"
                                                value={exp.title}
                                                onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Company</label>
                                            <input
                                                type="text"
                                                value={exp.company}
                                                onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                            <input
                                                type="date"
                                                value={exp.startDate}
                                                onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">End Date</label>
                                            <input
                                                type="date"
                                                value={exp.endDate}
                                                onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                                                disabled={exp.current}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea
                                            value={exp.description}
                                            onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                                            rows={3}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            placeholder="Describe your responsibilities and achievements..."
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Skills */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Skills</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Technical Skills</label>
                                    <textarea
                                        value={formData.skills.technical}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            skills: { ...prev.skills, technical: e.target.value }
                                        }))}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Programming languages, tools, frameworks..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Soft Skills</label>
                                    <textarea
                                        value={formData.skills.soft}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            skills: { ...prev.skills, soft: e.target.value }
                                        }))}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Leadership, communication, teamwork..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md"
                            >
                                Generate Resume
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}