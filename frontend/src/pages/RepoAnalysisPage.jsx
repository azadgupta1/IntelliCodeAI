// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchRepoAnalysisHistory } from "../services/githubServices";

// const RepoAnalysisPage = () => {
//   const { owner, repo } = useParams();
//   const [analyses, setAnalyses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       const data = await fetchRepoAnalysisHistory(owner, repo, token);

//       if (data.success) {
//         setAnalyses(data.analyses || []);
//       } else {
//         setAnalyses([]);
//       }
//     };

//     fetchData();
//   }, [owner, repo]);

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-xl font-semibold mb-4">Analysis Results for {repo}:</h2>
//       {analyses.length === 0 ? (
//         <p>No analysis data available.</p>
//       ) : (
//         <ul className="space-y-4">
//           {analyses.map((analysis, index) => (
//             <li key={index} className="p-4 border rounded-md shadow">
//               <p><strong>Commit:</strong> {analysis.commitHash}</p>
//               <p><strong>Analyzed Files:</strong> {analysis.files?.length || 0}</p>
//               <button
//                 className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md"
//                 onClick={() => navigate(`/analysis/${analysis.id}`)}
//               >
//                 View Details
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default RepoAnalysisPage;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRepoAnalysisHistory } from "../services/githubServices";
import { Loader } from "../components/ui/loader";

const AutoAnalysisStatus = () => {
  const { owner, repo } = useParams();
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const data = await fetchRepoAnalysisHistory(owner, repo, token);
      setAnalyses(data?.analyses || []);
      setLoading(false);
    };

    fetchData();
  }, [owner, repo]);

  return (
    <div className="p-6 bg-[#0f172a] rounded-2xl shadow-md border border-[#1e293b] text-white min-h-[300px]">
      <h2 className="text-2xl font-semibold mb-6 text-white">
        Auto Analysis History for{" "}
        <span className="text-blue-400">{repo}</span>
      </h2>

      {loading ? (
        <Loader />
      ) : analyses.length === 0 ? (
        <div className="text-gray-400 text-center py-6">
          No analysis data available.
        </div>
      ) : (
        <div className="space-y-4">
          {analyses.map((analysis, index) => (
  <div
    key={index}
    className="p-4 bg-[#1e293b] rounded-xl border border-[#334155] hover:border-blue-500 transition duration-200"
  >
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        {analysis.file?.filename ? (
          <p className="text-sm text-gray-300">
            <span className="text-blue-400 font-medium">File:</span>{" "}
            <code className="bg-[#0f172a] px-2 py-1 rounded-md text-sm text-gray-200">
              {analysis.file.filename}
            </code>
          </p>
        ) : (
          <p className="text-sm text-gray-500 italic">
            No file path available for this analysis.
          </p>
        )}
      </div>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm mt-2 transition"
        onClick={() => navigate(`/analysis/${analysis.id}`)}
      >
        View Details
      </button>
    </div>
  </div>
))}

        </div>
      )}
    </div>
  );
};

export default AutoAnalysisStatus;
