// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Repositories = () => {
//   const [repos, setRepos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRepos = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           setError("No token found. Please log in.");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get("http://localhost:3000/github/repos", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("Repositories:", response.data);

//         if (response.data.repositories) {
//           setRepos(response.data.repositories);
//         } else {
//           setError("Failed to fetch repositories.");
//         }
//       } catch (error) {
//         console.error("Fetch Error:", error);
//         setError("Error fetching repositories. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRepos();
//   }, []);

//   if (loading) return <p>Loading repositories...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   const enableAutoAnalysis = async (repoName) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "http://localhost:3000/github/enable-auto-analysis",
//         { repoName },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert(response.data.message);

//       // Refresh repo list to reflect changes
//       setRepos((prevRepos) =>
//         prevRepos.map((repo) =>
//           repo.repoName === repoName ? { ...repo, autoAnalyze: true } : repo
//         )
//       );
//     } catch (error) {
//       console.error("Enable Auto-Analysis Error:", error);
//       alert("Failed to enable auto-analysis");
//     }
//   };

//   const disableAutoAnalysis = async (repoName) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "http://localhost:3000/github/disable-auto-analysis",
//         { repoName },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert(response.data.message);

//       // Refresh repo list to reflect changes
//       setRepos((prevRepos) =>
//         prevRepos.map((repo) =>
//           repo.repoName === repoName ? { ...repo, autoAnalyze: false } : repo
//         )
//       );
//     } catch (error) {
//       console.error("Disable Auto-Analysis Error:", error);
//       alert("Failed to disable auto-analysis");
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-4">
//       <h2 className="text-lg font-semibold mb-4">📁 My Repositories</h2>
//       <div className="border border-gray-300 rounded-lg overflow-hidden">
//         {repos.length === 0 ? (
//           <p className="text-gray-500 p-4">No repositories found.</p>
//         ) : (
//           repos.map((repo) => (
//             <div
//               key={repo.repoUrl}
//               className="border-b border-gray-200 p-4 flex justify-between items-center"
//             >
//               <span className="font-medium">{repo.repoName}</span>
//               <div className="flex gap-2">
//                 <button
//                   className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
//                   onClick={() => {
//                     console.log(`Navigating to: /github/${repo.ownerName}/${repo.repoName}/analyze`);
//                     navigate(`/github/${repo.ownerName}/${repo.repoName}/analyze`);
//                   }}
//                 >
//                   📄 Analyze Manually
//                 </button>

//                 {!repo.autoAnalyze ? (
//                   <button
//                     className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
//                     onClick={() => enableAutoAnalysis(repo.repoName)}
//                   >
//                     🔔 Enable Auto-Analysis
//                   </button>
//                 ) : (
//                   <button
//                     className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
//                     onClick={() => disableAutoAnalysis(repo.repoName)}
//                   >
//                     ❌ Disable Auto-Analysis
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Repositories;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Switch } from "@headlessui/react";

const Repositories = () => {
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await axios.get("http://localhost:3000/github/repos", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRepos(response.data.repositories || []);
        setFilteredRepos(response.data.repositories || []);
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

  const toggleAutoAnalysis = async (repo) => {
    try {
      const token = localStorage.getItem("token");
      const endpoint = repo.autoAnalyze
        ? "disable-auto-analysis"
        : "enable-auto-analysis";

      const response = await axios.post(
        `http://localhost:3000/github/${endpoint}`,
        { repoName: repo.repoName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);

      setRepos((prev) =>
        prev.map((r) =>
          r.repoName === repo.repoName
            ? { ...r, autoAnalyze: !r.autoAnalyze }
            : r
        )
      );
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  if (loading) return <div className="p-4">Loading repositories...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="🔍 Search repositories..."
          className="w-full sm:w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
        >
          <option value="all">All</option>
          <option value="enabled">Auto-Analysis Enabled</option>
          <option value="disabled">Auto-Analysis Disabled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100 text-left text-sm text-gray-700">
            <tr>
              <th className="p-4 border-b">Repo Name</th>
              <th className="p-4 border-b">Issues</th>
              <th className="p-4 border-b">Last Updated</th>
              <th className="p-4 border-b">Actions</th>
              <th className="p-4 border-b">Auto-Analysis</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {filteredRepos.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No repositories found.
                </td>
              </tr>
            ) : (
              filteredRepos.map((repo) => (
                <tr key={repo.repoUrl} className="hover:bg-gray-50">
                  <td className="p-4 border-b font-medium">{repo.repoName}</td>
                  <td className="p-4 border-b">{repo.issues || 0}</td>
                  <td className="p-4 border-b">
                    {new Date(repo.lastUpdated).toLocaleDateString()}
                  </td>
                  <td className="p-4 border-b">
                    <button
                      className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-xs"
                      onClick={() =>
                        navigate(`/github/${repo.ownerName}/${repo.repoName}/analyze`)
                      }
                    >
                      Analyze
                    </button>
                  </td>
                  <td className="p-4 border-b">
                    <Switch
                      checked={repo.autoAnalyze}
                      onChange={() => toggleAutoAnalysis(repo)}
                      className={`${
                        repo.autoAnalyze ? "bg-green-500" : "bg-gray-300"
                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                      <span className="sr-only">Enable Auto-Analysis</span>
                      <span
                        className={`${
                          repo.autoAnalyze ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </Switch>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Repositories;
