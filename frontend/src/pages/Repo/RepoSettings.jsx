import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function RepoSettings() {
  const { owner, repo } = useParams();
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [toggling, setToggling] = useState(false);

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
      console.log("Fetched metadata:", res.data);
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
    console.log("Toggling auto-analysis. Current state:", meta.autoAnalyze);

    try {
      const endpoint = meta.autoAnalyze
        ? "disable-auto-analysis"
        : "enable-auto-analysis";

      await axios.post(
        `http://localhost:3000/github/${endpoint}`,
        {
          owner,
          repoName: repo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("Toggle successful. Refetching repo data...");
      await fetchRepoData();
    } catch (error) {
      console.error("Error toggling auto-analysis:", error);
    } finally {
      setToggling(false);
    }
  };

  useEffect(() => {
    fetchRepoData();
  }, [owner, repo]);


  const [deleting, setDeleting] = useState(false);

const handleDelete = async () => {
  if (!window.confirm("Are you sure you want to delete this repository from the platform? This action cannot be undone.")) {
    return;
  }

  try {
    setDeleting(true);
    await axios.delete(
      `http://localhost:3000/github/${owner}/${repo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Repository deleted successfully.");
    // Optionally redirect or refresh
    window.location.href = "/dashboard/repositories"; // adjust as needed
  } catch (err) {
    console.error("Error deleting repository", err);
    alert("Failed to delete repository.");
  } finally {
    setDeleting(false);
  }
};


  if (loading)
    return <p className="p-6 text-gray-400">Loading repository settings...</p>;
  if (!meta)
    return <p className="p-6 text-red-500">Failed to load repository settings.</p>;

  console.log("Render: meta.autoAnalyze =", meta.autoAnalyze);

  return (
    <div className="p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Repository Settings</h1>

      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Metadata Overview</h2>

        <div className="space-y-2 text-sm">
          <p><span className="font-medium">Repository:</span> {meta.repoName}</p>
          <p><span className="font-medium">Owner:</span> {meta.ownerName}</p>
          <p><span className="font-medium">Default Branch:</span> {meta.defaultBranch || "main"}</p>
          <p>
            <span className="font-medium">Branches:</span>{" "}
            {meta.branches?.length ? meta.branches.join(", ") : "No branches found"}
          </p>
          <p>
            <span className="font-medium">Last Synced:</span>{" "}
            {meta.lastSyncedAt
              ? new Date(meta.lastSyncedAt).toLocaleString()
              : "Never"}
          </p>
        </div>

        <button
          onClick={handleSync}
          disabled={syncing}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition disabled:opacity-50"
        >
          {syncing ? "Syncing..." : "Re-Sync Repository"}
        </button>
      </div>

      <div className="flex justify-between items-center mt-6 p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md">
        <span className="text-lg font-medium">Auto-Analysis</span>
        <button
          onClick={handleToggle}
          disabled={toggling}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            meta.autoAnalyze
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {toggling
            ? "Updating..."
            : meta.autoAnalyze
            ? "Enabled (Click to Disable)"
            : "Disabled (Click to Enable)"}
        </button>
      </div>


      <div className="mt-10 p-6 border border-red-400 bg-red-100 dark:bg-red-900 dark:border-red-600 rounded-2xl shadow-md">
  <h2 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-4">
    Danger Zone
  </h2>
  <p className="text-sm text-red-600 dark:text-red-400 mb-4">
    Deleting this repository will remove all associated analysis, files, and data from our platform. This action is irreversible.
  </p>
  <button
    onClick={handleDelete}
    disabled={deleting}
    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition disabled:opacity-50"
  >
    {deleting ? "Deleting..." : "Delete Repository From Platform"}
  </button>
</div>

    </div>
  );
}

export default RepoSettings;
