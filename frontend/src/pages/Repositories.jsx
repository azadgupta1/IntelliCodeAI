// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Switch } from "@headlessui/react";

// const Repositories = () => {
//   const [repos, setRepos] = useState([]);
//   const [filteredRepos, setFilteredRepos] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRepos = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("No token found");

//         const response = await axios.get("http://localhost:3000/github/repos", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setRepos(response.data.repositories || []);
//         setFilteredRepos(response.data.repositories || []);
//       } catch (err) {
//         setError("Failed to load repositories.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRepos();
//   }, []);

//   useEffect(() => {
//     let updated = repos.filter((repo) =>
//       repo.repoName.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     if (filter === "enabled") {
//       updated = updated.filter((repo) => repo.autoAnalyze);
//     } else if (filter === "disabled") {
//       updated = updated.filter((repo) => !repo.autoAnalyze);
//     }

//     setFilteredRepos(updated);
//   }, [searchTerm, filter, repos]);

//   const toggleAutoAnalysis = async (repo) => {
//     try {
//       const token = localStorage.getItem("token");
//       const endpoint = repo.autoAnalyze
//         ? "disable-auto-analysis"
//         : "enable-auto-analysis";

//       const response = await axios.post(
//         `http://localhost:3000/github/${endpoint}`,
//         { repoName: repo.repoName },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert(response.data.message);

//       setRepos((prev) =>
//         prev.map((r) =>
//           r.repoName === repo.repoName
//             ? { ...r, autoAnalyze: !r.autoAnalyze }
//             : r
//         )
//       );
//     } catch (err) {
//       console.error("Toggle error:", err);
//     }
//   };

//   if (loading) return <div className="p-4">Loading repositories...</div>;
//   if (error) return <div className="text-red-500 p-4">{error}</div>;

//   return (
//     <div className="bg-white rounded-xl p-6 shadow-lg">
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//         <input
//           type="text"
//           placeholder="🔍 Search repositories..."
//           className="w-full sm:w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
//         >
//           <option value="all">All</option>
//           <option value="enabled">Auto-Analysis Enabled</option>
//           <option value="disabled">Auto-Analysis Disabled</option>
//         </select>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full table-auto border-collapse border border-gray-200">
//           <thead className="bg-gray-100 text-left text-sm text-gray-700">
//             <tr>
//               <th className="p-4 border-b">Repo Name</th>
//               <th className="p-4 border-b">Issues</th>
//               <th className="p-4 border-b">Last Updated</th>
//               <th className="p-4 border-b">Actions</th>
//               <th className="p-4 border-b">Auto-Analysis</th>
//             </tr>
//           </thead>
//           <tbody className="text-sm text-gray-800">
//             {filteredRepos.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="p-4 text-center text-gray-500">
//                   No repositories found.
//                 </td>
//               </tr>
//             ) : (
//               filteredRepos.map((repo) => (
//                 <tr key={repo.repoUrl} className="hover:bg-gray-50">
//                   <td className="p-4 border-b font-medium">{repo.repoName}</td>
//                   <td className="p-4 border-b">{repo.issues || 0}</td>
//                   <td className="p-4 border-b">
//                     {new Date(repo.lastUpdated).toLocaleDateString()}
//                   </td>
//                   <td className="p-4 border-b">
//                     <button
//                       className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-xs"
//                       onClick={() =>
//                         navigate(`/github/${repo.ownerName}/${repo.repoName}/analyze`)
//                       }
//                     >
//                       Analyze
//                     </button>
//                   </td>
//                   <td className="p-4 border-b">
//                     <Switch
//                       checked={repo.autoAnalyze}
//                       onChange={() => toggleAutoAnalysis(repo)}
//                       className={`${
//                         repo.autoAnalyze ? "bg-green-500" : "bg-gray-300"
//                       } relative inline-flex h-6 w-11 items-center rounded-full`}
//                     >
//                       <span className="sr-only">Enable Auto-Analysis</span>
//                       <span
//                         className={`${
//                           repo.autoAnalyze ? "translate-x-6" : "translate-x-1"
//                         } inline-block h-4 w-4 transform rounded-full bg-white transition`}
//                       />
//                     </Switch>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Repositories;















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Switch } from "@headlessui/react";
// import { fetchAutoAnalysisRepos, fetchRepoAnalysisHistory } from "../services/githubServices";

// const Repositories = () => {
//   const [repos, setRepos] = useState([]);
//   const [filteredRepos, setFilteredRepos] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [showManageBox, setShowManageBox] = useState(false);
//   const [enabledRepos, setEnabledRepos] = useState([]);
//   const [selectedRepo, setSelectedRepo] = useState(null);
//   const [analyses, setAnalyses] = useState([]);

//   const navigate = useNavigate();

//   // Fetch all repos
//   useEffect(() => {
//     const fetchRepos = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:3000/github/repos", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const repoList = response.data.repositories || [];
//         setRepos(repoList);
//         setFilteredRepos(repoList);
//       } catch (err) {
//         setError("Failed to load repositories.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRepos();
//   }, []);

//   // Filter repos
//   useEffect(() => {
//     let updated = repos.filter((repo) =>
//       repo.repoName.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     if (filter === "enabled") {
//       updated = updated.filter((repo) => repo.autoAnalyze);
//     } else if (filter === "disabled") {
//       updated = updated.filter((repo) => !repo.autoAnalyze);
//     }

//     setFilteredRepos(updated);
//   }, [searchTerm, filter, repos]);

//   // Fetch auto-analysis enabled repos
//   useEffect(() => {
//     const fetchEnabled = async () => {
//       const token = localStorage.getItem("token");
//       const data = await fetchAutoAnalysisRepos(token);
//       if (data.success) setEnabledRepos(data.repositories);
//     };

//     fetchEnabled();
//   }, []);

//   const toggleAutoAnalysis = async (repo) => {
//     try {
//       const token = localStorage.getItem("token");
//       const endpoint = repo.autoAnalyze
//         ? "disable-auto-analysis"
//         : "enable-auto-analysis";

//       const response = await axios.post(
//         `http://localhost:3000/github/${endpoint}`,
//         { repoName: repo.repoName },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert(response.data.message);

//       setRepos((prev) =>
//         prev.map((r) =>
//           r.repoName === repo.repoName
//             ? { ...r, autoAnalyze: !r.autoAnalyze }
//             : r
//         )
//       );
//     } catch (err) {
//       console.error("Toggle error:", err);
//     }
//   };

//   const handleRepoClick = async (owner, repo) => {
//     setSelectedRepo(repo);
//     const token = localStorage.getItem("token");
//     const data = await fetchRepoAnalysisHistory(owner, repo, token);

//     if (data.success) {
//       setAnalyses(data.analyses || []);
//     } else {
//       setAnalyses([]);
//     }
//   };

//   if (loading) return <div className="p-4">Loading repositories...</div>;
//   if (error) return <div className="text-red-500 p-4">{error}</div>;

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-lg">
//       {/* Top bar */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold">🔍 Auto-Analysis Status</h2>
//         <button
//           onClick={() => setShowManageBox(!showManageBox)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
//         >
//           {showManageBox ? "Close" : "Manage Repositories"}
//         </button>
//       </div>

//       {/* Manage Repositories Box */}
//       {showManageBox && (
//         <div className="mb-8 border p-4 rounded-lg shadow-md bg-gray-50">
//           <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
//             <input
//               type="text"
//               placeholder="Search repositories..."
//               className="w-full sm:w-1/2 border px-4 py-2 rounded-md"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />

//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="border px-4 py-2 rounded-md"
//             >
//               <option value="all">All</option>
//               <option value="enabled">Auto-Analysis Enabled</option>
//               <option value="disabled">Auto-Analysis Disabled</option>
//             </select>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full table-auto border-collapse border border-gray-200">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="p-4 border-b">Repo Name</th>
//                   <th className="p-4 border-b">Issues</th>
//                   <th className="p-4 border-b">Last Updated</th>
//                   <th className="p-4 border-b">Actions</th>
//                   <th className="p-4 border-b">Auto-Analysis</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredRepos.length === 0 ? (
//                   <tr>
//                     <td colSpan="5" className="p-4 text-center text-gray-500">
//                       No repositories found.
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredRepos.map((repo) => (
//                     <tr key={repo.repoUrl} className="hover:bg-gray-50">
//                       <td className="p-4 border-b font-medium">{repo.repoName}</td>
//                       <td className="p-4 border-b">{repo.issues || 0}</td>
//                       <td className="p-4 border-b">
//                         {new Date(repo.lastUpdated).toLocaleDateString()}
//                       </td>
//                       <td className="p-4 border-b">
//                         <button
//                           className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-xs"
//                           onClick={() =>
//                             navigate(`/github/${repo.ownerName}/${repo.repoName}/analyze`)
//                           }
//                         >
//                           Analyze
//                         </button>
//                       </td>
//                       <td className="p-4 border-b">
//                         <Switch
//                           checked={repo.autoAnalyze}
//                           onChange={() => toggleAutoAnalysis(repo)}
//                           className={`${
//                             repo.autoAnalyze ? "bg-green-500" : "bg-gray-300"
//                           } relative inline-flex h-6 w-11 items-center rounded-full`}
//                         >
//                           <span className="sr-only">Enable Auto-Analysis</span>
//                           <span
//                             className={`${
//                               repo.autoAnalyze ? "translate-x-6" : "translate-x-1"
//                             } inline-block h-4 w-4 transform rounded-full bg-white transition`}
//                           />
//                         </Switch>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Auto Analysis Status */}
//       {enabledRepos.length === 0 ? (
//         <p>No auto-analyzed repositories found.</p>
//       ) : (
//         <div>
//           <h3 className="font-semibold">Select a repository:</h3>
//           <ul className="mb-4">
//             {enabledRepos.map((repo) => (
//               <li
//                 key={repo.repoName}
//                 className="cursor-pointer text-blue-600 hover:underline"
//                 onClick={() => handleRepoClick(repo.ownerName, repo.repoName)}
//               >
//                 📂 {repo.repoName}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Analysis Results */}
//       {selectedRepo && (
//         <div className="border border-gray-300 rounded-md p-4 mt-4">
//           <h3 className="font-semibold">Analysis Results for {selectedRepo}:</h3>
//           {analyses.length === 0 ? (
//             <p>No analysis data available.</p>
//           ) : (
//             <ul>
//               {analyses.map((analysis, index) => (
//                 <li key={index} className="p-2 border rounded-md my-2">
//                   <p><strong>Commit:</strong> {analysis.commitHash}</p>
//                   <p><strong>Analyzed Files:</strong> {analysis.files?.length || 0}</p>
//                   <button
//                     className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md"
//                     onClick={() => navigate(`/analysis/${analysis.id}`)}
//                   >
//                     View Details
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Repositories;






import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RepoTable from "../components/RepoTable";
import EnabledRepoList from "../components/EnabledRepoList";
import { fetchAutoAnalysisRepos } from "../services/githubServices";

const Repositories = () => {
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showManageBox, setShowManageBox] = useState(false);
  const [enabledRepos, setEnabledRepos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/github/repos", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const repoList = response.data.repositories || [];
        setRepos(repoList);
        setFilteredRepos(repoList);
      } catch (err) {
        setError("Failed to load repositories.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  useEffect(() => {
    let updated = repos.filter((repo) =>
      repo.repoName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filter === "enabled") {
      updated = updated.filter((repo) => repo.autoAnalyze);
    } else if (filter === "disabled") {
      updated = updated.filter((repo) => !repo.autoAnalyze);
    }

    setFilteredRepos(updated);
  }, [searchTerm, filter, repos]);

  useEffect(() => {
    const fetchEnabled = async () => {
      const token = localStorage.getItem("token");
      const data = await fetchAutoAnalysisRepos(token);
      if (data.success) setEnabledRepos(data.repositories);
    };

    fetchEnabled();
  }, []);

  const toggleAutoAnalysis = async (repo) => {
    try {
      const token = localStorage.getItem("token");
      const endpoint = repo.autoAnalyze ? "disable-auto-analysis" : "enable-auto-analysis";

      const response = await axios.post(
        `http://localhost:3000/github/${endpoint}`,
        { repoName: repo.repoName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);

      setRepos((prev) =>
        prev.map((r) =>
          r.repoName === repo.repoName ? { ...r, autoAnalyze: !r.autoAnalyze } : r
        )
      );
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const handleRepoClick = (owner, repo) => {
    navigate(`/repositories/${owner}/${repo}`);
  };

  if (loading) return <div className="p-4">Loading repositories...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <RepoTable
        {...{
          filteredRepos,
          navigate,
          searchTerm,
          setSearchTerm,
          filter,
          setFilter,
          showManageBox,
          setShowManageBox,
          toggleAutoAnalysis,
        }}
      />

      <EnabledRepoList enabledRepos={enabledRepos} onSelect={handleRepoClick} />
    </div>
  );
};

export default Repositories;
