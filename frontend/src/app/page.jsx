'use client'
import React from "react";
import ResumeUploader from '../components/ResumeUploader';

const Home = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Resume Uploader</h1>
      <ResumeUploader/>
    </main>
  );
}

export default Home;