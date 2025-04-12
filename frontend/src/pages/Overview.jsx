import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#10B981", "#EF4444"]; // Green & Red

const Overview = () => {
  const [commitData, setCommitData] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analysisStats, setAnalysisStats] = useState({ enabled: 0, disabled: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get("http://localhost:3000/github/repos", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const repos = response.data.repositories || [];

        const enabled = repos.filter((r) => r.autoAnalyze).length;
        const disabled = repos.length - enabled;

        const sortedRepos = repos
          .filter((r) => r.lastUpdated)
          .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
          .slice(0, 5);

        setRepos(sortedRepos);
        setAnalysisStats({ enabled, disabled });

        // Example mock commit data
        const mockCommits = [
          { week: "Mon", commits: 12 },
          { week: "Tue", commits: 9 },
          { week: "Wed", commits: 15 },
          { week: "Thu", commits: 6 },
          { week: "Fri", commits: 18 },
          { week: "Sat", commits: 4 },
          { week: "Sun", commits: 10 },
        ];

        setCommitData(mockCommits);
      } catch (err) {
        console.error("Overview load error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6 text-gray-600">Loading dashboard...</div>;

  return (
    <div className="p-6 space-y-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Overview</h2>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Weekly Commits */}
        <div className="bg-white border rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            📈 Weekly Commit Activity
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={commitData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="commits" stroke="#3B82F6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Auto Analysis */}
        <div className="bg-white border rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            ⚙️ Auto-Analysis Status
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                dataKey="value"
                data={[
                  { name: "Enabled", value: analysisStats.enabled },
                  { name: "Disabled", value: analysisStats.disabled },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recently Updated Repositories */}
      <div className="bg-white border rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          🕒 Recently Updated Repositories
        </h3>
        <ul className="divide-y divide-gray-200">
          {repos.map((repo) => (
            <li key={repo.repoName} className="py-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">{repo.repoName}</p>
                <p className="text-sm text-gray-500">
                  Updated: {new Date(repo.lastUpdated).toLocaleString()}
                </p>
              </div>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  repo.autoAnalyze
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {repo.autoAnalyze ? "Auto-Analysis On" : "Off"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Overview;
