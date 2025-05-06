// // src/pages/Commits/CommitsPage.jsx
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";  // ✅ Add this
// import CommitList from "../components/CommitList";
// import CommitDetailModal from "../components/CommitDetailModal";
// import axios from "axios";

// const CommitsPage = () => {
//   const [commits, setCommits] = useState([]);
//   const [selectedCommit, setSelectedCommit] = useState(null);
//   const { owner, repo } = useParams();  // ✅ Destructure params

//   useEffect(() => {
//     const fetchCommits = async () => {
//       try {

//             const token = localStorage.getItem("token");
    
//             if (!token) {
//               setError("No token found. Please log in.");
//               setLoading(false);
//               return;
//             }

//         const res = await axios.get(`http://localhost:3000/github/${owner}/${repo}/commits`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//         ); // ✅ Dynamic API

//         setCommits(res.data.commits);
//       } catch (err) {
//         console.error("Error fetching commits", err);
//       }
//     };

//     fetchCommits();
//   }, [owner, repo]); // ✅ Re-fetch when route params change

//   return (
//     <div className="p-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">Recent Commits</h1>
//       <CommitList commits={commits} onSelectCommit={setSelectedCommit} />
//       {selectedCommit && (
//         <CommitDetailModal commit={selectedCommit} onClose={() => setSelectedCommit(null)} />
//       )}
//     </div>
//   );
// };

// export default CommitsPage;



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommitList from "../../components/CommitList";
import CommitDetailModal from "../../components/CommitDetailModal";
import axios from "axios";

const CommitsPage = () => {
  const [commits, setCommits] = useState([]);
  const [analyzedHashes, setAnalyzedHashes] = useState(new Set());
  const [selectedCommit, setSelectedCommit] = useState(null);
  const { owner, repo } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const [commitsRes, analysisRes] = await Promise.all([
          axios.get(`http://localhost:3000/github/${owner}/${repo}/commits`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:3000/analysis/history`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setCommits(commitsRes.data.commits);
        const hashes = new Set((analysisRes.data.data || []).map(item => item.commitHash));
        setAnalyzedHashes(hashes);
      } catch (err) {
        console.error("Error fetching commit or analysis data", err);
      }
    };

    fetchData();
  }, [owner, repo]);

  return (
    <div className="p-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Recent Commits</h1>
      <CommitList
        commits={commits}
        analyzedHashes={analyzedHashes}
        onSelectCommit={setSelectedCommit}
      />
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

