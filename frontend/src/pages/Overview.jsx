import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend
} from "recharts";

const reviewData = [
  { day: "Mon", reviews: 10 },
  { day: "Tue", reviews: 15 },
  { day: "Wed", reviews: 8 },
  { day: "Thu", reviews: 20 },
  { day: "Fri", reviews: 12 },
  { day: "Sat", reviews: 6 },
  { day: "Sun", reviews: 18 },
];

const issueData = [
  { repo: "AI Engine", issues: 5, prs: 2 },
  { repo: "Frontend", issues: 3, prs: 4 },
  { repo: "Backend", issues: 6, prs: 1 },
];

const recentRepos = [
  {
    name: "ai-review-core",
    lastUpdated: "Apr 12, 2025",
    reviews: 24,
    quality: "A+",
    status: "Passing",
  },
  {
    name: "dashboard-ui",
    lastUpdated: "Apr 10, 2025",
    reviews: 17,
    quality: "A",
    status: "Stable",
  },
  {
    name: "api-server",
    lastUpdated: "Apr 9, 2025",
    reviews: 30,
    quality: "B+",
    status: "Needs Review",
  },
];

const metricCard = (label, value, icon) => (
  <div className="bg-white shadow-md p-5 rounded-xl flex items-center gap-4">
    <div className="text-blue-600 text-2xl">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

const Overview = () => {
  return (
    <div className="p-8 space-y-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Overview</h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCard("Code Coverage", "92%", "🧪")}
        {metricCard("Build Success Rate", "98.4%", "✅")}
        {metricCard("Avg. Review Time", "4h 35m", "⏱️")}
        {metricCard("Code Quality Score", "A+", "📈")}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart */}
        <div className="bg-white shadow-md p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            📆 Code Reviews Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reviewData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="reviews" stroke="#3B82F6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow-md p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            🐞 Open Issues & PRs by Repository
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={issueData}>
              <XAxis dataKey="repo" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="issues" stackId="a" fill="#EF4444" name="Issues" />
              <Bar dataKey="prs" stackId="a" fill="#10B981" name="Pull Requests" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recently Updated Repositories */}
      <div className="bg-white shadow-md p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-6 text-gray-700">
          🔁 Recently Updated Repositories
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="border-b text-gray-500">
              <tr>
                <th className="py-2 px-4">Repository</th>
                <th className="py-2 px-4">Last Updated</th>
                <th className="py-2 px-4">Reviews</th>
                <th className="py-2 px-4">Quality</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentRepos.map((repo) => (
                <tr key={repo.name} className="border-t">
                  <td className="py-3 px-4 font-medium text-blue-600">{repo.name}</td>
                  <td className="py-3 px-4">{repo.lastUpdated}</td>
                  <td className="py-3 px-4">{repo.reviews}</td>
                  <td className="py-3 px-4">{repo.quality}</td>
                  <td
                    className={`py-3 px-4 font-semibold ${
                      repo.status === "Passing"
                        ? "text-green-600"
                        : repo.status === "Stable"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {repo.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
