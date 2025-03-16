// src/pages/UploadFile.jsx
import React, { useState } from 'react';
import { uploadFile, analyzeFile } from '../services/api';
import Navbar from '../components/Landing/Navbar';

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setAnalysisResult(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError('');

    try {
      const uploadResponse = await uploadFile(selectedFile);
      const { file } = uploadResponse;

      const analysisResponse = await analyzeFile(file.id);
      setAnalysisResult(analysisResponse.result);
    } catch (err) {
      setError('Failed to analyze file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="flex flex-col items-center w-full max-w-lg p-8 mt-12 bg-gray-800 rounded-lg shadow-lg mx-auto">
        <h2 className="text-2xl mb-4">📂 Upload Your Code for AI Analysis</h2>
        <input
          type="file"
          accept=".js,.py,.java"
          onChange={handleFileChange}
          className="mb-4 p-2 bg-gray-700 rounded"
        />
        <button
          onClick={handleUpload}
          disabled={!selectedFile || loading}
          className={`px-4 py-2 rounded ${loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Analyzing...' : '🔍 Analyze File'}
        </button>

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {analysisResult && (
          <div className="mt-8 p-4 bg-gray-700 rounded-lg w-full">
            <h3 className="text-xl mb-2">📝 Analysis Results:</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(analysisResult, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;






// // src/pages/UploadFile.jsx
// import React, { useState } from 'react';
// import { uploadFile, analyzeFile } from '../services/fileServices';

// const UploadFile = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//     setAnalysisResult(null);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) return;
//     setLoading(true);
//     setError('');

//     try {
//       const uploadResponse = await uploadFile(selectedFile);
//       const { file } = uploadResponse;

//       const analysisResponse = await analyzeFile(file.id);
//       setAnalysisResult(analysisResponse.result);
//     } catch (err) {
//       setError('Failed to analyze file. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
//       <header className="w-full p-4 bg-gray-800 shadow-md flex justify-between items-center">
//         <h1 className="text-xl font-semibold">IntelliCodeAI</h1>
//         <nav>
//           <button className="mx-2 hover:underline">Home</button>
//           <button className="mx-2 hover:underline">Upload File</button>
//           <button className="mx-2 hover:underline">GitHub Analysis</button>
//         </nav>
//       </header>

//       <div className="flex flex-col items-center w-full max-w-lg p-8 mt-12 bg-gray-800 rounded-lg shadow-lg">
//         <h2 className="text-2xl mb-4">📂 Upload Your Code for AI Analysis</h2>
//         <input
//           type="file"
//           accept=".js,.py,.java"
//           onChange={handleFileChange}
//           className="mb-4 p-2 bg-gray-700 rounded"
//         />
//         <button
//           onClick={handleUpload}
//           disabled={!selectedFile || loading}
//           className={`px-4 py-2 rounded ${
//             loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
//           }`}
//         >
//           {loading ? 'Analyzing...' : '🔍 Analyze File'}
//         </button>

//         {error && <p className="mt-4 text-red-500">{error}</p>}

//         {analysisResult && (
//           <div className="mt-8 p-4 bg-gray-700 rounded-lg w-full">
//             <h3 className="text-xl mb-2">📝 Analysis Results:</h3>
//             <pre className="whitespace-pre-wrap">{JSON.stringify(analysisResult, null, 2)}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UploadFile;
