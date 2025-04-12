// import React, { useState } from 'react';
// import { uploadFile, analyzeFile } from '../services/api';
// import Navbar from '../components/Landing/Navbar';

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
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Navbar />
//       <div className="flex flex-col items-center w-full max-w-lg p-8 mt-12 bg-gray-800 rounded-lg shadow-lg mx-auto">
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
//           className={`px-4 py-2 rounded ${loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'}`}
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


// import React, { useState } from 'react';
// import { uploadFile, analyzeFile } from '../services/api';
// import Navbar from '../components/Landing/Navbar';

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
//     <div className="min-h-screen bg-black text-white">
//       <Navbar />
//       <div className="flex flex-col lg:flex-row justify-center items-start gap-8 px-6 py-16 max-w-7xl mx-auto">
//         {/* Left Side: Analysis Result */}
//         <div className="flex-1 w-full backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg">
//           <h2 className="text-2xl font-semibold mb-4">📝 Analysis Results</h2>
//           {error && <p className="text-red-500 mb-4">{error}</p>}
//           {analysisResult ? (
//             <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(analysisResult, null, 2)}</pre>
//           ) : (
//             <p className="text-gray-400">Upload a file to see results here.</p>
//           )}
//         </div>

//         {/* Right Side: Upload Form */}
//         <div className="w-full max-w-md backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg">
//           <h2 className="text-2xl font-semibold mb-6 text-center">📂 Upload Your Code</h2>
//           <input
//             type="file"
//             accept=".js,.py,.java"
//             onChange={handleFileChange}
//             className="block w-full text-sm text-white bg-gray-700 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 mb-6"
//           />
//           <button
//             onClick={handleUpload}
//             disabled={!selectedFile || loading}
//             className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition ${
//               loading
//                 ? 'bg-gray-600 cursor-not-allowed'
//                 : 'bg-blue-600 hover:bg-blue-700'
//             }`}
//           >
//             {loading ? 'Analyzing...' : '🔍 Analyze File'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadFile;




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
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex flex-col lg:flex-row justify-center items-start gap-8 px-6 py-16 max-w-7xl mx-auto">
        {/* Analysis Results */}
        <div className="flex-1 w-full backdrop-blur-md bg-white/5 p-6 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00ffd1]/10 to-[#00e6b8]/5 rounded-2xl pointer-events-none blur-md" />
          <h2 className="text-3xl font-bold mb-4 relative z-10">🧠 Analysis Result</h2>
          {error && <p className="text-red-500 mb-4 relative z-10">{error}</p>}
          {analysisResult ? (
            <div className="space-y-6 relative z-10 text-sm">
              {/* Errors */}
              {analysisResult.errors?.length > 0 && (
                <div>
                  <h3 className="text-red-400 font-semibold mb-2 text-lg">🛑 Errors</h3>
                  <ul className="list-disc list-inside space-y-1 text-red-300">
                    {analysisResult.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Suggestions */}
              {analysisResult.suggestions?.length > 0 && (
                <div>
                  <h3 className="text-yellow-400 font-semibold mb-2 text-lg">💡 Suggestions</h3>
                  <ul className="list-disc list-inside space-y-1 text-yellow-300">
                    {analysisResult.suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Optimizations */}
              {analysisResult.optimizations?.length > 0 && (
                <div>
                  <h3 className="text-green-400 font-semibold mb-2 text-lg">🚀 Optimizations</h3>
                  <ul className="list-disc list-inside space-y-1 text-green-300">
                    {analysisResult.optimizations.map((opt, index) => (
                      <li key={index}>{opt}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-400 relative z-10">Upload a file to see the analysis.</p>
          )}
        </div>

        {/* Upload Form */}
        <div className="w-full max-w-sm min-h-[380px] bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl p-8 relative overflow-hidden">
          {/* Decorative Gradient Blur */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00ffd1]/10 to-[#00e6b8]/5 blur-xl rounded-2xl z-0" />

          <div className="relative z-10 space-y-6 h-full flex flex-col justify-between">
            {/* Title */}
            <div>
              <h2 className="text-3xl font-bold text-center mb-4">Upload Your Code</h2>
            </div>

            {/* File Upload Box */}
            <div className="border-2 border-dashed border-white/20 rounded-xl p-5 flex flex-col justify-center items-center bg-white/10 hover:bg-white/20 transition">
              <label htmlFor="fileUpload" className="text-sm text-gray-300 mb-3 cursor-pointer">
                {selectedFile ? (
                  <span className="text-white">{selectedFile.name}</span>
                ) : (
                  <>Click to select your code file</>
                )}
              </label>
              <input
                id="fileUpload"
                type="file"
                accept=".js,.py,.java,.cpp,.ts,.jsx,.json,.cs,.rb"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="text-xs text-gray-400">Max size: 75MB</span>

              {/* Analyze Button */}
              <button
                onClick={handleUpload}
                disabled={!selectedFile || loading}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition ${
                  loading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-[#00ffd1] text-black hover:bg-[#00e6b8]'
                }`}
              >
                {loading ? 'Analyzing...' : '📎 Analyze Code'}
              </button>
            </div>

            

            {/* Supported Formats */}
            <div className="text-xs text-gray-400 text-center mt-2">
              Supported Formats: <span className="text-white font-medium">.js, .py, .java, .cpp, .ts, .jsx, .json, .cs, .rb</span>
            </div>
          </div>
        </div>



      </div>
    </div>
  );
};

export default UploadFile;
