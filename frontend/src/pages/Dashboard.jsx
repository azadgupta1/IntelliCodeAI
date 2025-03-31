// import React from 'react'

// function Dashboard() {
//   return (
//     <div>Dashboard</div>
//   )
// }

// export default Dashboard


// import React, { useState, useEffect } from "react";
// import RepositoryList from "../components/Github/RepositoryList";
// import { fetchUserRepos } from "../services/githubServices";

// function Dashboard() {
//   const [repositories, setRepositories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadRepos = async () => {
//       try {
//         const fetchedRepos = await fetchUserRepos();
//         setRepositories(fetchedRepos);
//       } catch (error) {
//         console.error("Failed to load repositories:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadRepos();
//   }, []);

//   const handleManualAnalyze = (repo) => {
//     console.log("Manual analysis for:", repo.repoName);
//     // Add manual analysis logic here
//   };

//   const handleAutoAnalyze = (repo) => {
//     console.log("Auto analysis enabled for:", repo.repoName);
//     // Add auto-analysis logic here
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-5">
//       <h1 className="text-3xl font-bold mb-4">My GitHub Repositories</h1>
//       <RepositoryList
//         repositories={repositories}
//         onManualAnalyze={handleManualAnalyze}
//         onAutoAnalyze={handleAutoAnalyze}
//       />
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState, useEffect } from "react";
import AnalysisHistory from "../components/Github/AnalysisHistory";
import UserRepositories from "../components/UserRepositories";
import Header from "../components/Header";
// import GitHubAnalysis from "./GithubAnalysis";

const Dashboard = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token"); // Ensure the key matches your storage
    console.log("Stored Token:", storedToken); // Debugging

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div className="p-6">
      <Header /> 
      <div>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {token ? (
          <AnalysisHistory token={token} />
        ) : (
          <p className="text-red-500">Please log in with GitHub.</p>
        )}
      </div>

      <div>
          <UserRepositories token={token} />
      </div>
    </div>
    
  );
};

export default Dashboard;
