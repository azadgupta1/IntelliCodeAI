import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommitList from "../../components/RepoComponents/CommitPage/CommitList";
import CommitDetailModal from "../../components/RepoComponents/CommitPage/CommitDetailModal";
import axios from "axios";
import { API_BASE_URL } from "../../services/githubServices";

const CommitsPage = () => {
  const [commits, setCommits] = useState([]);
  const [analyzedHashes, setAnalyzedHashes] = useState(new Set());
  const [selectedCommit, setSelectedCommit] = useState(null);
  const [loading, setLoading] = useState(true);

  const { owner, repo } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        setLoading(true);

        const [commitsRes, analysisRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/github/${owner}/${repo}/commits`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_BASE_URL}/analysis/history`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setCommits(commitsRes.data.commits);
        const hashes = new Set(
          (analysisRes.data.data || []).map(item => item.commitHash)
        );
        setAnalyzedHashes(hashes);
      } catch (err) {
        console.error("Error fetching commit or analysis data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [owner, repo]);

  return (
    <div className="p-10 bg-gray-950 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Recent Commits</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : (
        <CommitList
          commits={commits}
          analyzedHashes={analyzedHashes}
          onSelectCommit={setSelectedCommit}
        />
      )}

      {selectedCommit && (
        <CommitDetailModal
          commit={selectedCommit}
          onClose={() => setSelectedCommit(null)}
        />
      )}
    </div>
  );
};

export default CommitsPage;
