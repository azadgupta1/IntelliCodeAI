import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import RepoTable from "../../components/OverviewComponents/Repositories/RepoTable";
import EnabledRepoList from "../../components/OverviewComponents/Repositories/EnabledRepoList";
import { fetchAutoAnalysisRepos } from "../../services/githubServices";
import { API_BASE_URL } from "../../services/githubServices";

const fetchRepos = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.get(`${API_BASE_URL}/github/repos`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.repositories || [];
};

const Repositories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [showManageBox, setShowManageBox] = useState(false);
  const [enabledRepos, setEnabledRepos] = useState([]);

  const navigate = useNavigate();

  const {
    data: repos = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["repos"],
    queryFn: fetchRepos,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  /* -------- Filter Logic -------- */
  const filteredRepos = repos.filter((repo) => {
    const matchesSearch = repo.repoName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (filter === "enabled") return repo.autoAnalyze && matchesSearch;
    if (filter === "disabled") return !repo.autoAnalyze && matchesSearch;
    return matchesSearch;
  });

  /* -------- Enabled repos -------- */
  useEffect(() => {
    const fetchEnabled = async () => {
      const token = localStorage.getItem("token");
      const data = await fetchAutoAnalysisRepos(token);
      if (data?.success) setEnabledRepos(data.repositories || []);
    };
    fetchEnabled();
  }, []);

  const toggleAutoAnalysis = async (repo) => {
    try {
      const token = localStorage.getItem("token");
      const endpoint = repo.autoAnalyze
        ? "disable-auto-analysis"
        : "enable-auto-analysis";

      await axios.post(
        `${API_BASE_URL}/github/${endpoint}`,
        { repoName: repo.repoName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      window.location.reload();
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const handleRepoClick = (owner, repo) => {
    navigate(`/repositories/${owner}/${repo}`);
  };

  /* -------- Loading -------- */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="h-10 w-10 rounded-full border-4 border-slate-300 border-t-slate-900 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-sm text-red-600">{error.message}</p>
      </div>
    );
  }

return (
  <div className="min-h-screen bg-white">
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

      {/* -------- Header -------- */}
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold text-slate-900">
          Repositories
        </h1>

        <p className="text-sm text-slate-600 max-w-2xl">
          Connect, manage, and control automatic code analysis across your
          GitHub repositories.
        </p>

        {/* Accent divider */}
        <div className="h-1 w-24 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500" />
      </header>

      {/* -------- Repo Management Card -------- */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-white">
          <h2 className="text-lg font-medium text-slate-900">
            Repository Management
          </h2>
          <p className="text-sm text-slate-500">
            Enable or disable auto-analysis for individual repositories
          </p>
        </div>

        <div className="p-6">
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
        </div>
      </section>

      {/* -------- Enabled Repos Card -------- */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-slate-900">
              Active Auto-Analysis
            </h2>
            <p className="text-sm text-slate-500">
              Repositories currently monitored by IntelliCodeAI
            </p>
          </div>

          {/* Status pill */}
          <span className="text-xs font-medium px-3 py-1 rounded-full
            bg-indigo-50 text-indigo-700 border border-indigo-200">
            {enabledRepos.length} Active
          </span>
        </div>

        <div className="p-6">
          <EnabledRepoList
            enabledRepos={enabledRepos}
            onSelect={handleRepoClick}
          />
        </div>
      </section>

    </div>
  </div>
);
};

export default Repositories;
