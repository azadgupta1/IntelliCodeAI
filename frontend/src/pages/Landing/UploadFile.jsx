import React, { useState } from "react";
import { uploadFile, analyzeFile } from "../../services/api";

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setAnalysisResult(null);
    setError("");
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError("");
    try {
      const uploadResponse = await uploadFile(selectedFile);
      const { file } = uploadResponse;
      const analysisResponse = await analyzeFile(file.id);
      setAnalysisResult(analysisResponse.result);
    } catch (err) {
      setError("Failed to analyze file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-300 via-blue-600 to-violet-300 pt-[90px] px-4 text-gray-800">
      <div className="max-w-7xl mx-auto py-16 flex flex-col lg:flex-row gap-10 items-start">

        {/* Analysis Result Panel */}
        <div className="flex-1 w-full bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-violet-50 to-transparent pointer-events-none rounded-2xl" />

          <h2 className="text-3xl font-bold mb-6 relative z-10 text-gray-900">
            AI Analysis Results
          </h2>

          {error && (
            <p className="text-red-600 mb-4 relative z-10">{error}</p>
          )}

          {analysisResult ? (
            <div className="space-y-8 text-sm relative z-10">

              {analysisResult.errors?.length > 0 && (
                <section>
                  <h3 className="text-red-600 font-semibold text-xl mb-3">
                    Critical Errors
                  </h3>
                  <div className="space-y-3">
                    {analysisResult.errors.map((err, i) => (
                      <div
                        key={i}
                        className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500"
                      >
                        <p className="text-red-700 font-medium">
                          {err.message}
                        </p>
                        {err.line && (
                          <p className="text-xs text-red-500 mt-1">
                            Line: {err.line}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {analysisResult.suggestions?.length > 0 && (
                <section>
                  <h3 className="text-yellow-600 font-semibold text-xl mb-3">
                    Suggestions
                  </h3>
                  <div className="space-y-3">
                    {analysisResult.suggestions.map((sugg, i) => (
                      <div
                        key={i}
                        className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400"
                      >
                        <p className="text-yellow-800 font-medium">
                          {sugg.message}
                        </p>
                        {sugg.line && (
                          <p className="text-xs text-yellow-600 mt-1">
                            Line: {sugg.line}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {analysisResult.optimizations?.length > 0 && (
                <section>
                  <h3 className="text-green-600 font-semibold text-xl mb-3">
                    Optimizations
                  </h3>
                  <div className="space-y-3">
                    {analysisResult.optimizations.map((opt, i) => (
                      <div
                        key={i}
                        className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500"
                      >
                        <p className="text-green-800 font-medium">
                          {opt.message}
                        </p>
                        {opt.line && (
                          <p className="text-xs text-green-600 mt-1">
                            Line: {opt.line}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          ) : (
            <p className="text-gray-500 relative z-10">
              Upload a code file to see AI-powered insights.
            </p>
          )}
        </div>

        {/* Upload Panel */}
        <div className="w-full max-w-sm bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-violet-50 to-transparent pointer-events-none rounded-2xl" />

          <div className="relative z-10 flex flex-col space-y-6">
            <h2 className="text-2xl font-semibold text-center text-gray-900">
              Upload Your Code
            </h2>

            <label
              htmlFor="fileUpload"
              className="cursor-pointer text-center border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition"
            >
              {selectedFile ? (
                <span className="text-gray-900 font-medium">
                  {selectedFile.name}
                </span>
              ) : (
                <span className="text-gray-700 font-medium">
                  Click to select a code file
                </span>
              )}
              <input
                id="fileUpload"
                type="file"
                accept=".js,.ts,.py,.cpp,.java,.cs,.json,.rb,.jsx"
                onChange={handleFileChange}
                className="hidden"
              />
              <p className="text-xs mt-2 text-gray-400">
                Max size: 75MB
              </p>
            </label>

            <button
              onClick={handleUpload}
              disabled={!selectedFile || loading}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                !selectedFile || loading
                  ? "bg-black/30 text-white/60 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-900"
              }`}
            >
              {loading ? "Analyzing..." : "Analyze Code"}
            </button>

            <p className="text-xs text-center text-gray-400">
              Supported: <span className="font-medium text-gray-700">
                .js, .ts, .py, .java, .cpp, .json, .cs, .rb
              </span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UploadFile;
