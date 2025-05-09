import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { IoIosGitBranch } from "react-icons/io";
import { IoAnalytics } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import Switch from "../../components/ui/Switch";



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
        `http://localhost:3000/github/${owner}/${repo}/settings`,
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
        `http://localhost:3000/github/${owner}/${repo}/sync`,
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
        `http://localhost:3000/github/${endpoint}`,
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
      await axios.delete(`http://localhost:3000/github/${owner}/${repo}`, {
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
      {activeTab === "general" && (
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

          {/* Danger Zone */}
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

          {activeTab === "branches" && (
            <div className="space-y-4">

            <div className="relative w-64">
              {/* Icon positioned inside the input */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CiSearch className="text-gray-400 text-lg" />
              </div>

              {/* Input with left padding to avoid overlapping the icon */}
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
          )}



      {activeTab === "auto" && (
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
      )}

      
    </div>
  );
}

export default RepoSettings;

