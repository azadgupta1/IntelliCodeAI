import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PullRequestCard from "../../components/RepoComponents/Pulls/PullRequestCard";
import { API_BASE_URL } from "../../services/githubServices";

const PullsPage = () => {
  const [pullRequests, setPullRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { owner, repo } = useParams();

  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPullRequests = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${API_BASE_URL}/github/${owner}/${repo}/pulls`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const activePRs = res.data.pullRequests.filter(
          pr => pr.state === "open" && pr.merged_at === null && pr.state === "closed"
        );

        setPullRequests(activePRs);
      } catch (err) {
        console.error("Error fetching pull requests:", err);
        setError("Failed to load pull requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchPullRequests();
  }, [owner, repo]);

  return (
    <div className="p-10 bg-gray-950 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Pull Requests</h1>

      {loading ? (
        <p className="text-gray-500">Loading pull requests...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : pullRequests.length === 0 ? (
        <p className="text-gray-500">No active pull requests.</p>
      ) : (
        <div className="space-y-4">
          {pullRequests.map(pr => (
            <PullRequestCard key={pr.id} pr={pr} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PullsPage;
