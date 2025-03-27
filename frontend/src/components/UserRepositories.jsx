import React, { useState, useEffect } from "react";
import axios from "axios";

const UserRepositories = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("The token is:", token);

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

        // Extract the repositories array from the response
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
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
                  📄 Analyze Manually
                </button>
                <button className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">
                  🔔 Enable Auto-Analysis
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserRepositories;
