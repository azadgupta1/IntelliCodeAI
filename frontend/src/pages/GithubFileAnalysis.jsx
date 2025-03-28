// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const GithubFileAnalysis = () => {
//   const { owner, repo } = useParams();
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           setError("No token found. Please log in.");
//           setLoading(false);
//           return;
//         }

//         if (!owner || !repo) {
//           setError("Invalid repository details.");
//           setLoading(false);
//           return;
//         }

//         console.log(`Fetching files from: http://localhost:3000/github/repos/${owner}/${repo}/files`);

//         const response = await axios.get(`http://localhost:3000/github/repos/${owner}/${repo}/files`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("Repository Files:", response.data);

//         if (response.data.files) {
//           setFiles(response.data.files);
//         } else {
//           setError("No files found in the repository.");
//         }
//       } catch (error) {
//         console.error("Error fetching repository files:", error);
//         setError("Failed to fetch repository files.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFiles();
//   }, [owner, repo]);

//   if (loading) return <p>Loading files...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="p-6">
//       <button onClick={() => navigate("/dashboard")} className="text-blue-500">
//         ← Back to Repositories
//       </button>
//       <h1 className="text-2xl font-semibold">📁 {repo} - Select a File for Analysis</h1>

//       {files.length === 0 ? (
//         <p className="text-gray-500">No files found in the repository.</p>
//       ) : (
//         <ul className="list-disc pl-5">
//           {files.map((file) => (
//             <li key={file}>{file}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default GithubFileAnalysis;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const GithubFileAnalysis = () => {
//   const { owner, repo } = useParams();
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [analysisResult, setAnalysisResult] = useState(null);
  
//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(`http://localhost:3000/github/repos/${owner}/${repo}/files`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setFiles(response.data.files);
//       } catch (err) {
//         setError("Error fetching repository files.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFiles();
//   }, [owner, repo]);

//   // Function to analyze a file
//   const analyzeFile = async (filePath) => {
//     try {
//       setSelectedFile(filePath);
//       setAnalysisResult(null);
//       const token = localStorage.getItem("token");

//       const response = await axios.post(
//         `http://localhost:3000/github/repos/${owner}/${repo}/analyze`,
//         { filePath },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setAnalysisResult(response.data.analysis);
//     } catch (err) {
//       setAnalysisResult("Error analyzing file. Try again.");
//     }
//   };

//   if (loading) return <p>Loading files...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="bg-white shadow-md rounded-lg p-4">
//       <h2 className="text-lg font-semibold mb-4">📁 {repo} - Select a File for Analysis</h2>
//       <div className="border border-gray-300 rounded-lg overflow-hidden">
//         {files.length === 0 ? (
//           <p className="text-gray-500 p-4">No files found in the repository.</p>
//         ) : (
//           files.map((file) => (
//             <button
//               key={file}
//               onClick={() => analyzeFile(file)}
//               className="block w-full text-left p-2 border-b border-gray-200 hover:bg-gray-100"
//             >
//               {file}
//             </button>
//           ))
//         )}
//       </div>

//       {selectedFile && (
//         <div className="mt-4 p-4 border rounded-lg">
//           <h3 className="text-md font-semibold">📄 Analyzing: {selectedFile}</h3>
//           {analysisResult ? <pre className="mt-2 p-2 bg-gray-100">{analysisResult}</pre> : <p>Analyzing...</p>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default GithubFileAnalysis;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const GithubFileAnalysis = () => {
  const { owner, repo } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  // Fetch repository files on mount
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found.");

        const response = await axios.get(
          `http://localhost:3000/github/repos/${owner}/${repo}/files`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setFiles(response.data.files || []);
      } catch (err) {
        setError("Error fetching repository files.");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [owner, repo]);

  // Function to analyze a file
  const analyzeFile = async (filePath) => {
    try {
      setSelectedFile(filePath);
      setAnalysisResult(null);
      setAnalyzing(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `http://localhost:3000/github/repos/${owner}/${repo}/analyze`,
        { filePath },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAnalysisResult(response.data.analysis);
    } catch (err) {
      setError("Error analyzing file. Try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) return <p>Loading files...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Back to Repositories
      </button>

      <h2 className="text-lg font-semibold mb-4">📁 {repo} - Select a File for Analysis</h2>
      
      {/* File List */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {files.length === 0 ? (
          <p className="text-gray-500 p-4">No files found in the repository.</p>
        ) : (
          files.map((file) => (
            <button
              key={file}
              onClick={() => analyzeFile(file)}
              className="block w-full text-left p-2 border-b border-gray-200 hover:bg-gray-100"
            >
              {file}
            </button>
          ))
        )}
      </div>

      {/* Analysis Result Section */}
      {selectedFile && (
        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="text-md font-semibold">📄 Analyzing: {selectedFile}</h3>
          {analyzing ? (
            <p>Analyzing...</p>
          ) : analysisResult ? (
            <div className="mt-3 p-3 bg-gray-100 rounded">
              <h4 className="font-semibold">🔍 Analysis Results</h4>
              <pre className="text-sm bg-white p-2 rounded border">
                {JSON.stringify(analysisResult, null, 2)}
              </pre>
            </div>
          ) : (
            <p>No analysis result available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GithubFileAnalysis;
