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
