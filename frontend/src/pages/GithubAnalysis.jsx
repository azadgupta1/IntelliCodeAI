// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const GitHubAnalysis = () => {
//     const [repositories, setRepositories] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const API_BASE_URL = "http://localhost:3000";

//     useEffect(() => {
//         const fetchGitHubRepos = async () => {
//             setLoading(true);
//             setError(null);

//             try {
//                 const token = localStorage.getItem("token");

//                 if (!token) {
//                     setError("No authentication token found. Please log in.");
//                     setLoading(false);
//                     return;
//                 }

//                 const response = await axios.get(`${API_BASE_URL}/github/repos`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                     withCredentials: true,
//                 });

//                 if (response.data && Array.isArray(response.data.repositories)) {
//                     setRepositories(response.data.repositories);
//                 } else {
//                     throw new Error("Invalid response format.");
//                 }
//             } catch (error) {
//                 console.error("GitHub API Error:", error);
//                 setError(error.response?.data?.message || "Failed to fetch repositories.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchGitHubRepos();
//     }, []);

//     return (
//         <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
//             <h1 className="text-2xl font-semibold mb-4">🔍 GitHub Analysis</h1>

//             <div className="bg-gray-50 p-4 rounded-md">
//                 <h2 className="text-lg font-semibold mb-2">📁 My Repositories</h2>
                
//                 {loading && <p>Loading...</p>}
//                 {error && <p className="text-red-500">{error}</p>}

//                 {!loading && !error && repositories.length === 0 && (
//                     <p>No repositories found.</p>
//                 )}

//                 {!loading && !error &&
//                     repositories.map((repo) => (
//                         <div key={repo.id} className="bg-white p-4 my-2 shadow-sm rounded-md">
//                             <p className="font-medium">✅ Repo: {repo.repoName}</p>
//                         </div>
//                     ))}
//             </div>
//         </div>
//     );
// };

// export default GitHubAnalysis;


// Needs to be evaluated once