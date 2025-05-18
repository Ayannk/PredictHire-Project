'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Templates = () => {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      id: 1,
      name: 'Modern Template',
      image: '/templates/template2.png',
      preview: '/templates/modern-preview.svg',
      description: 'Clean and professional design with modern typography'
    },
    {
      id: 2,
      name: 'Creative Template',
      image: '/templates/template3.png',
      preview: '/templates/creative-preview.svg',
      description: 'Stand out with a creative and unique layout'
    },
    {
      id: 3,
      name: 'Classic Template',
      image: '/templates/template4.png',
      preview: '/templates/template3.png',
      description: 'Traditional and elegant resume format'
    },
    {
      id: 4,
      name: 'Technical Template',
      image: '/templates/template7.png',
      preview: '/templates/template4.png',
      description: 'Perfect for technical roles and developers'
    }
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleCreateResume = () => {
    if (selectedTemplate) {
      router.push(`/user/resume-builder?template=${selectedTemplate.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Resume Template</h1>
          <p className="text-lg text-gray-600">Select from our professionally designed templates to create your perfect resume</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 ${
                selectedTemplate?.id === template.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleTemplateSelect(template)}
            >
              <div className="relative h-96">
                <Image
                  src={template.image}
                  alt={template.name}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="p-4"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-gray-600">{template.description}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedTemplate && (
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 border-t">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Selected: {selectedTemplate.name}</h3>
                <p className="text-sm text-gray-600">{selectedTemplate.description}</p>
              </div>
              <button
                onClick={handleCreateResume}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Resume with this Template
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;