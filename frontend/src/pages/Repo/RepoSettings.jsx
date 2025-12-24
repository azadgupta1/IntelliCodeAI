import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { IoIosGitBranch } from "react-icons/io";
import { IoAnalytics } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import Switch from "../../components/ui/Switch";
import { API_BASE_URL } from "../../services/githubServices";



function RepoSettings() {
  const { owner, repo } = useParams();
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [branchSearch, setBranchSearch] = useState("");

  const token = localStorage.getItem("token");

  const fetchRepoData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_BASE_URL}/github/${owner}/${repo}/settings`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(res.data);
      setMeta(res.data);

    } catch (err) {
      console.error("Error fetching repo settings", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    try {
      setSyncing(true);
      await axios.put(
        `${API_BASE_URL}/github/${owner}/${repo}/sync`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchRepoData();
    } catch (err) {
      console.error("Error syncing metadata", err);
    } finally {
      setSyncing(false);
    }
  };

  const handleToggle = async () => {
    if (!meta) return;
    setToggling(true);
    try {
      const endpoint = meta.autoAnalyze
        ? "disable-auto-analysis"
        : "enable-auto-analysis";

      await axios.post(
        `${API_BASE_URL}/github/${endpoint}`,
        { owner, repoName: repo },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      await fetchRepoData();
    } catch (error) {
      console.error("Error toggling auto-analysis:", error);
    } finally {
      setToggling(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this repository from the platform? This action cannot be undone.")) {
      return;
    }

    try {
      setDeleting(true);
      await axios.delete(`${API_BASE_URL}/github/${owner}/${repo}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Repository deleted successfully.");
      window.location.href = "/dashboard/repositories";
    } catch (err) {
      console.error("Error deleting repository", err);
      alert("Failed to delete repository.");
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchRepoData();
  }, [owner, repo]);

  if (loading)
    return <p className="p-6 text-gray-500">Loading repository settings...</p>;
  if (!meta)
    return <p className="p-6 text-red-500">Failed to load repository settings.</p>;

  const filteredBranches = meta.branches?.filter((b) =>
    b.name.toLowerCase().includes(branchSearch.toLowerCase())
  );


  const getRelativeTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - new Date(date)) / 1000); // in seconds
  
    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];
  
    for (const interval of intervals) {
      const count = Math.floor(diff / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }
  
    return "just now";
  };

  

  return (
    <div className="p-8 bg-white min-h-screen text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Repository Settings</h1>

      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-6">
        {["general", "branches", "auto"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium border-b-2 transition ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent hover:text-blue-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "general" ? "General" : tab === "branches" ? "Branches" : "Auto Analysis"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {/* {activeTab === "general" && (
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-xl shadow">
            <p className="text-sm">
              <span className="font-medium">Repository:</span> {meta.repoName}
            </p>
            <p className="text-sm">
              <span className="font-medium">Owner:</span> {meta.ownerName}
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow flex items-center justify-between">
            <div>
              <p className="text-sm font-medium mb-1">Last Synced:</p>
              <p className="text-sm">
                {meta.lastSyncedAt
                  ? new Date(meta.lastSyncedAt).toLocaleString()
                  : "Never"}
              </p>
            </div>
            <button
              onClick={handleSync}
              disabled={syncing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg disabled:opacity-50 transition"
            >
              {syncing ? "Syncing..." : "Re-Sync Repository"}
            </button>
          </div>

      <div className="mt-10 p-6 border border-red-400 bg-red-100 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-red-700 mb-4">Danger Zone</h2>
        <p className="text-sm text-red-600 mb-4">
          Deleting this repository will remove all associated analysis, files,
          and data from our platform. This action is irreversible.
        </p>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete Repository"}
        </button>
      </div>
        </div>
      )} */}

          {activeTab === "general" && (
  <div className="space-y-8">
    {/* Repository Info */}
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        Repository Information
      </h3>

      <div className="grid sm:grid-cols-2 gap-6 text-sm">
        <div>
          <p className="text-slate-500 mb-1">Repository</p>
          <p className="font-medium text-slate-800">
            {meta.repoName}
          </p>
        </div>

        <div>
          <p className="text-slate-500 mb-1">Owner</p>
          <p className="font-medium text-slate-800">
            {meta.ownerName}
          </p>
        </div>
      </div>
    </div>

    {/* Sync Status */}
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-1">
          Sync Status
        </h3>
        <p className="text-sm text-slate-500">
          Last synced
        </p>
        <p className="text-sm font-medium text-slate-700 mt-1">
          {meta.lastSyncedAt
            ? new Date(meta.lastSyncedAt).toLocaleString()
            : "Never"}
        </p>
      </div>

      <button
        onClick={handleSync}
        disabled={syncing}
        className="inline-flex items-center justify-center rounded-xl
                   bg-slate-900 px-6 py-2.5 text-sm font-medium text-white
                   hover:bg-slate-800 transition
                   disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {syncing ? "Syncing repository…" : "Re-sync repository"}
      </button>
    </div>

    {/* ⚠️ Danger Zone — untouched as requested */}
    <div className="mt-10 p-6 border border-red-400 bg-red-100 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-red-700 mb-4">Danger Zone</h2>
      <p className="text-sm text-red-600 mb-4">
        Deleting this repository will remove all associated analysis, files,
        and data from our platform. This action is irreversible.
      </p>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition disabled:opacity-50"
      >
        {deleting ? "Deleting..." : "Delete Repository"}
      </button>
    </div>
  </div>
)}



          {/* {activeTab === "branches" && (
            <div className="space-y-4">

            <div className="relative w-64">
              
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CiSearch className="text-gray-400 text-lg" />
              </div>

              
              <input
                type="text"
                placeholder="Search branches..."
                value={branchSearch}
                onChange={(e) => setBranchSearch(e.target.value)}
                className="pl-10 pr-3 py-1.5 border rounded-md w-full shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>


<div className="overflow-x-auto rounded-lg shadow">
  <table className="min-w-full text-sm text-left border border-gray-200">
    <thead className="bg-gray-100 text-gray-700 uppercase">
      <tr>
        <th className="px-3 py-3 w-32">
          <div className="flex items-center space-x-1">
            <IoAnalytics />
            <span>Analysis</span>
          </div>
        </th>
        <th className="px-2 py-3 w-48">
          <div className="flex items-center space-x-1">
            <IoIosGitBranch />
            <span>Branch</span>
          </div>
        </th>
        <th className="px-4 py-3 text-center">
          <div className="flex items-center justify-center space-x-1">
            <CiBookmark />
            <span>Default</span>
          </div>
        </th>
        <th className="px-4 py-3">
          <div className="flex items-center space-x-1">
            <IoTimeOutline />
            <span>Last Updated</span>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      {filteredBranches?.length ? (
        filteredBranches.map((branch, idx) => {
          const isDefault = meta?.defaultBranch === branch.name;
          return (
            <tr
              key={idx}
              className="border-t hover:bg-gray-50 transition-colors"
            >
              <td className="px-3 py-2 text-center">
                {isDefault ? <Switch initialChecked={true} disabled={true} /> : null}
              </td>


              <td className="px-2 py-2">{branch.name}</td>
              <td className="px-4 py-2 text-center">
                {isDefault && (
                  <span className="inline-block text-xs font-semibold text-white bg-blue-500 px-2 py-0.5 rounded-full">
                    Default
                  </span>
                )}
              </td>
              <td className="px-4 py-2">
                {branch.lastUpdated
                  ? getRelativeTime(branch.lastUpdated)
                  : "Unknown"}
              </td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan={4} className="px-4 py-4 text-gray-500 text-center">
            No branches found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

            </div>
          )} */}


      {activeTab === "branches" && (
  <div className="space-y-6">
    {/* Search */}
    <div className="flex items-center justify-between">
      <div className="relative w-72">
        <input
          type="text"
          placeholder="Search branches"
          value={branchSearch}
          onChange={(e) => setBranchSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm
                     placeholder:text-slate-400 shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      <span className="text-sm text-slate-500">
        {filteredBranches?.length || 0} branches
      </span>
    </div>

    {/* Table */}
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-6 py-4 text-left font-medium">
              Branch
            </th>
            <th className="px-6 py-4 text-left font-medium">
              Analysis
            </th>
            <th className="px-6 py-4 text-left font-medium">
              Last updated
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {filteredBranches?.length ? (
            filteredBranches.map((branch, idx) => {
              const isDefault = meta?.defaultBranch === branch.name;

              return (
                <tr
                  key={idx}
                  className="hover:bg-slate-50 transition"
                >
                  {/* Branch */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-slate-800">
                        {branch.name}
                      </span>

                      {isDefault && (
                        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                          Default
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Analysis */}
                  <td className="px-6 py-4">
                    {isDefault ? (
                      <span className="inline-flex items-center gap-2 text-sm text-emerald-600">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Enabled
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>

                  {/* Last updated */}
                  <td className="px-6 py-4 text-slate-500">
                    {branch.lastUpdated
                      ? getRelativeTime(branch.lastUpdated)
                      : "Unknown"}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={3}
                className="px-6 py-16 text-center text-slate-500"
              >
                No branches match your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}




      {/* {activeTab === "auto" && (
        <div className="bg-gray-50 p-6 rounded-xl shadow flex items-center justify-between">
          <span className="text-lg font-medium">Auto-Analysis</span>
          <button
            onClick={handleToggle}
            disabled={toggling}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              meta.autoAnalyze
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            } text-white`}
          >
            {toggling
              ? "Updating..."
              : meta.autoAnalyze
              ? "Enabled (Click to Disable)"
              : "Disabled (Click to Enable)"}
          </button>
        </div>
      )} */}

      {activeTab === "auto" && (
  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
    <div className="flex items-center justify-between gap-6">
      {/* Left Content */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800">
          Auto-Analysis
        </h3>
        <p className="text-sm text-slate-500 mt-1 max-w-md">
          Automatically analyze new commits and code changes as they are uploaded
          to IntelliCodeAI.
        </p>
      </div>

      {/* Toggle */}
      <button
        onClick={handleToggle}
        disabled={toggling}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition
          ${meta.autoAnalyze ? "bg-emerald-600" : "bg-slate-300"}
          ${toggling ? "opacity-60 cursor-not-allowed" : ""}
        `}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition
            ${meta.autoAnalyze ? "translate-x-6" : "translate-x-1"}
          `}
        />
      </button>
    </div>

    {/* Status */}
    <div className="mt-4 text-sm">
      <span
        className={`inline-flex items-center gap-2 font-medium
          ${meta.autoAnalyze ? "text-emerald-600" : "text-slate-500"}
        `}
      >
        <span
          className={`h-2 w-2 rounded-full
            ${meta.autoAnalyze ? "bg-emerald-500" : "bg-slate-400"}
          `}
        />
        {toggling
          ? "Updating preference…"
          : meta.autoAnalyze
          ? "Auto-Analysis is enabled"
          : "Auto-Analysis is disabled"}
      </span>
    </div>
  </div>
)}


      
    </div>
  );
}

export default RepoSettings;

