// import React, { useEffect, useState } from 'react';
// import { FaExclamationTriangle } from 'react-icons/fa';
// import { useParams, useNavigate } from 'react-router-dom';
// import { fetchRepoErrors } from '../services/githubServices';

// function RepoOverview() {
//   const { owner, repo } = useParams();
//   const navigate = useNavigate();
//   const [errorCount, setErrorCount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getErrors = async () => {
//       setLoading(true);
//       const data = await fetchRepoErrors(owner, repo);

//       if (data.success) {
//         setErrorCount(data.errorCount);
//       } else {
//         console.error(data.message);
//       }

//       setLoading(false);
//     };

//     getErrors();
//   }, [owner, repo]);

//   const handleClick = () => {
//     navigate(`/repositories/${owner}/${repo}/issues`);
//   };

//   if (loading) return <div className="p-4">Loading error data...</div>;

//   return (
//     <div className="p-4">
//       <div className="flex justify-end">
//         <div
//           onClick={handleClick}
//           className="flex items-center bg-red-100 text-red-600 border border-red-300 rounded-md px-4 py-2 shadow space-x-3 cursor-pointer hover:bg-red-200 transition-all"
//           title="Go to Issues"
//         >
//           <span className="text-xl">Total Number of Errors: {errorCount}</span>
//           <FaExclamationTriangle className="text-2xl" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RepoOverview;

import React, { useEffect, useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRepoErrors } from '../services/githubServices';
import RepoErrorChart from '../components/RepoErrorChart'; // 👈 import chart

function RepoOverview() {
  const { owner, repo } = useParams();
  const navigate = useNavigate();
  const [errorCount, setErrorCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [repoId, setRepoId] = useState(null); // assuming you get repoId from API

  useEffect(() => {
    const getErrors = async () => {
      setLoading(true);
      const data = await fetchRepoErrors(owner, repo);

      console.log(data);
      if (data.success) {
        setErrorCount(data.data.errorCount);
        setRepoId(data.data.id); // include repoId in response or fetch it
      } else {
        console.error(data.message);
      }
      setLoading(false);
    };
    getErrors();
  }, [owner, repo]);

  const handleClick = () => {
    navigate(`/repositories/${owner}/${repo}/issues`);
  };

  if (loading) return <div className="p-4">Loading error data...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <div
          onClick={handleClick}
          className="flex items-center bg-red-100 text-red-600 border border-red-300 rounded-md px-4 py-2 shadow space-x-3 cursor-pointer hover:bg-red-200 transition-all"
          title="Go to Issues"
        >
          <span className="text-xl">Total Number of Errors: {errorCount}</span>
          <FaExclamationTriangle className="text-2xl" />
        </div>
      </div>

      {repoId && <RepoErrorChart repoId={repoId} range="7d" />}
    </div>
  );
}

export default RepoOverview;
