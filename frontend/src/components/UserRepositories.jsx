// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const UserRepositories = () => {
//   const [repos, setRepos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchRepos = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         console.log("The token is:", token);

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

//         // Extract the repositories array from the response
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
//                 <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
//                   📄 Analyze Manually
//                 </button>
//                 <button className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">
//                   🔔 Enable Auto-Analysis
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserRepositories;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const UserRepositories = () => {
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

//   // const enableAutoAnalysis = async (repoName) => {
//   //   try {
//   //     const token = localStorage.getItem("token");
//   //     const response = await axios.post(
//   //       "http://localhost:3000/github/enable-auto-analysis",
//   //       { repoName },
//   //       { headers: { Authorization: `Bearer ${token}` } }
//   //     );
  
//   //     alert(response.data.message);
//   //   } catch (error) {
//   //     console.error("Enable Auto-Analysis Error:", error);
//   //     alert("Failed to enable auto-analysis");
//   //   }
//   // };
//   const enableAutoAnalysis = async (repoName) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "http://localhost:3000/github/enable-auto-analysis",
//         { repoName },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
  
//       alert(response.data.message);
  
//       // Redirect to the Auto-Analysis Status Page
//       navigate("/auto-analysis-status");
//     } catch (error) {
//       console.error("Enable Auto-Analysis Error:", error);
//       alert("Failed to enable auto-analysis");
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
//                 {/* <button className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">
//                   🔔 Enable Auto-Analysis
//                 </button> */}
//                 <button
//                   className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
//                   onClick={() => enableAutoAnalysis(repo.repoName)}
//                 >
//                   🔔 Enable Auto-Analysis
//                 </button>

//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserRepositories;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRepositories = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:3000/github/repos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Repositories:", response.data);

        if (response.data.repositories) {
          setRepos(response.data.repositories);
        } else {
          setError("Failed to fetch repositories.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError("Error fetching repositories. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) return <p>Loading repositories...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const enableAutoAnalysis = async (repoName) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/github/enable-auto-analysis",
        { repoName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);

      // Refresh repo list to reflect changes
      setRepos((prevRepos) =>
        prevRepos.map((repo) =>
          repo.repoName === repoName ? { ...repo, autoAnalyze: true } : repo
        )
      );
    } catch (error) {
      console.error("Enable Auto-Analysis Error:", error);
      alert("Failed to enable auto-analysis");
    }
  };

  const disableAutoAnalysis = async (repoName) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/github/disable-auto-analysis",
        { repoName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);

      // Refresh repo list to reflect changes
      setRepos((prevRepos) =>
        prevRepos.map((repo) =>
          repo.repoName === repoName ? { ...repo, autoAnalyze: false } : repo
        )
      );
    } catch (error) {
      console.error("Disable Auto-Analysis Error:", error);
      alert("Failed to disable auto-analysis");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">📁 My Repositories</h2>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {repos.length === 0 ? (
          <p className="text-gray-500 p-4">No repositories found.</p>
        ) : (
          repos.map((repo) => (
            <div
              key={repo.repoUrl}
              className="border-b border-gray-200 p-4 flex justify-between items-center"
            >
              <span className="font-medium">{repo.repoName}</span>
              <div className="flex gap-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
                  onClick={() => {
                    console.log(`Navigating to: /github/${repo.ownerName}/${repo.repoName}/analyze`);
                    navigate(`/github/${repo.ownerName}/${repo.repoName}/analyze`);
                  }}
                >
                  📄 Analyze Manually
                </button>

                {!repo.autoAnalyze ? (
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
                    onClick={() => enableAutoAnalysis(repo.repoName)}
                  >
                    🔔 Enable Auto-Analysis
                  </button>
                ) : (
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                    onClick={() => disableAutoAnalysis(repo.repoName)}
                  >
                    ❌ Disable Auto-Analysis
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserRepositories;
