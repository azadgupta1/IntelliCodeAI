// src/pages/github/RepoFiles.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RepoFiles = () => {
  const { owner, repo } = useParams();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API_BASE_URL}/github/${owner}/${repo}/files`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.files) {
          setFiles(response.data.files);
        } else {
          setError("No files found.");
        }
      } catch (err) {
        console.error("Error fetching files:", err);
        setError("Failed to load files.");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [owner, repo]);

  if (loading) return <p>Loading files...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">📂 Files in {repo}</h3>
      <ul className="list-disc pl-6">
        {files.map((file, idx) => (
          <li key={idx} className="mb-1 text-gray-700">
            {file}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoFiles;
