
import React, { useState } from 'react';
import { uploadFile, analyzeFile } from '../../services/api';
import Navbar from '../../components/Landing/Navbar';

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
  <div className="space-y-8 relative z-10 text-sm">
    {/* Errors */}
    {analysisResult.errors?.length > 0 && (
      <div>
        <h3 className="text-red-400 font-bold text-xl mb-3">🛑 Critical Errors</h3>
        <div className="space-y-3">
          {analysisResult.errors.map((err, index) => (
            <div key={index} className="p-4 bg-red-900/40 border-l-4 border-red-500 rounded-lg">
              <div className="flex items-center justify-between">
                <p className="text-red-300 font-medium">{err.message}</p>
                <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">
                  {err.severity?.toUpperCase() || 'UNKNOWN'}
                </span>
              </div>
              {err.line && (
                <p className="text-xs text-red-200 mt-1">📍 Line: {err.line}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Suggestions */}
    {analysisResult.suggestions?.length > 0 && (
      <div>
        <h3 className="text-yellow-300 font-bold text-xl mb-3">💡 Suggestions</h3>
        <div className="space-y-3">
          {analysisResult.suggestions.map((sugg, index) => (
            <div key={index} className="p-4 bg-yellow-900/40 border-l-4 border-yellow-400 rounded-lg">
              <p className="text-yellow-200 font-medium">{sugg.message}</p>
              {sugg.line && (
                <p className="text-xs text-yellow-100 mt-1">📍 Line: {sugg.line}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Optimizations */}
    {analysisResult.optimizations?.length > 0 && (
      <div>
        <h3 className="text-green-400 font-bold text-xl mb-3">🚀 Optimizations</h3>
        <div className="space-y-3">
          {analysisResult.optimizations.map((opt, index) => (
            <div key={index} className="p-4 bg-green-900/40 border-l-4 border-green-500 rounded-lg">
              <p className="text-green-200 font-medium">{opt.message}</p>
              {opt.line && (
                <p className="text-xs text-green-100 mt-1">📍 Line: {opt.line}</p>
              )}
            </div>
          ))}
        </div>
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
