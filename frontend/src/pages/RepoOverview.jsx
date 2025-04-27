import React, { useEffect, useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRepoErrors } from '../services/githubServices';

function RepoOverview() {
  const { owner, repo } = useParams();
  const navigate = useNavigate();
  const [errorCount, setErrorCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getErrors = async () => {
      setLoading(true);
      const data = await fetchRepoErrors(owner, repo);

      if (data.success) {
        setErrorCount(data.errorCount);
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
      <div className="flex justify-end">
        <div
          onClick={handleClick}
          className="flex items-center bg-red-100 text-red-600 border border-red-300 rounded-md px-4 py-2 shadow space-x-3 cursor-pointer hover:bg-red-200 transition-all"
          title="Go to Issues"
        >
          <span className="text-xl">Total Number of Errors: {errorCount}</span>
          <FaExclamationTriangle className="text-2xl" />
        </div>
      </div>
    </div>
  );
}

export default RepoOverview;






















// import React, { useEffect, useState } from 'react';
// import { FaExclamationTriangle } from 'react-icons/fa';
// import { useParams } from 'react-router-dom';
// import { fetchRepoErrors } from '../services/githubServices';

// function RepoOverview() {
//   const { owner, repo } = useParams();
//   const [errorCount, setErrorCount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getErrors = async () => {
//       setLoading(true);
//       const data = await fetchRepoErrors(owner, repo);

//       if (data.success) {
//         setErrorCount(data.errorCount);  // assuming backend returns { success: true, errorCount: number }
//       } else {
//         console.error(data.message);
//       }

//       setLoading(false);
//     };

//     getErrors();
//   }, [owner, repo]);

//   if (loading) return <div className="p-4">Loading error data...</div>;

//   return (
//     <div className="p-4">
//       <div className="flex justify-end">
//         <div className="flex items-center bg-red-100 text-red-600 border border-red-300 rounded-md px-4 py-2 shadow space-x-3">
//           <span className="text-xl">Total Number of Errors: {errorCount}</span>
//           <FaExclamationTriangle className="text-2xl" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RepoOverview;
