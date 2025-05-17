import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import RepoTable from "../../components/RepoTable";
import EnabledRepoList from "../../components/EnabledRepoList";
import { fetchAutoAnalysisRepos } from "../../services/githubServices";
import { API_BASE_URL } from "../../services/githubServices";

const fetchRepos = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await axios.get(`${API_BASE_URL}/github/repos`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log(response);

  console.log(response.data.repositories);

  return response.data.repositories || [];
};

const Repositories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [showManageBox, setShowManageBox] = useState(false);
  const [enabledRepos, setEnabledRepos] = useState([]);

  const navigate = useNavigate();

  // ⏳ Use React Query for repo fetching and caching
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
  

  // 🧠 Local filtering
  const filteredRepos = repos.filter((repo) => {
    const matchesSearch = repo.repoName.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === "enabled") return repo.autoAnalyze && matchesSearch;
    if (filter === "disabled") return !repo.autoAnalyze && matchesSearch;

    return matchesSearch;
  });

  // 🔄 Fetch enabled repos once
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
        `${API_BASE_URL}/github/${endpoint}`,
        { repoName: repo.repoName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);

      // Update manually since we aren’t using mutation here
      // (Optional: you can use `useMutation` + `queryClient.invalidateQueries(['repos'])`)
      window.location.reload(); // or better: use queryClient.setQueryData to update cache manually
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const handleRepoClick = (owner, repo) => {
    navigate(`/repositories/${owner}/${repo}`);
  };

  if (isLoading) return <div className="p-4">Loading repositories...</div>;
  if (isError) return <div className="text-red-500 p-4">{error.message}</div>;

  return (
    <div className="w-full px-4 md:px-8 py-6 bg-white rounded-xl shadow-lg">
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

