'use client';
import { useState } from "react";
import axios from "axios";

function ResumeUploader() {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadResume = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post("http://localhost:5000/api/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setParsedData(response.data.savedResume);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileChange} />
      <button onClick={uploadResume} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
        {loading ? "Uploading..." : "Upload Resume"}
      </button>

      {parsedData && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <h3 className="font-bold">Parsed Resume:</h3>
          <pre className="whitespace-pre-wrap">{JSON.stringify(parsedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
export default ResumeUploader;