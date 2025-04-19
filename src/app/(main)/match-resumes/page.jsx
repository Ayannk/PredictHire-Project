"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResumeMatcher = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/getall`)
      .then(res => {
        console.log(res.data);
        setMatches(res.data)
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Resume Match Results</h2>
      
    </div>
  );
};

export default ResumeMatcher;
