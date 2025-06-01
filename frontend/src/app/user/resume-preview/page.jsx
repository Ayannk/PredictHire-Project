'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const ResumePreviewContent = () => {
  const searchParams = useSearchParams();
  const resumeId = searchParams.get('id');
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (resumeId) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/${resumeId}/download`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => response.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching PDF:', err);
          setError('Failed to load resume preview');
          setLoading(false);
        });
    }
  }, [resumeId]);

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-16">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Resume Preview</h1>
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Download PDF
            </button>
          </div>
          
          <div className="w-full aspect-[1/1.414] rounded-lg overflow-hidden border border-gray-200">
            <iframe
              src={pdfUrl}
              className="w-full h-full"
              title="Resume Preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrapper component with Suspense
const ResumePreview = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center mt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <ResumePreviewContent />
    </Suspense>
  );
};

export default ResumePreview;