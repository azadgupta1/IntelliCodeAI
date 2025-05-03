// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Overview() {
//   const [repos, setRepos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRepos = async () => {
//       try {
//         // Retrieve the token from localStorage
//         const token = localStorage.getItem('token');

//         if (!token) {
//           setError('No access token found');
//           setLoading(false);
//           return;
//         }

//         // Fetch repositories data from the backend with the token in the header
//         const response = await axios.get('http://localhost:3000/github/repos/fetchLatest', {
//           headers: {
//             Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
//           },
//         });

//         setRepos(response.data.repositories);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching repositories');
//         setLoading(false);
//       }
//     };

//     fetchRepos();
//   }, []);

//   // Render loading state
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Render error state
//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">GitHub Repositories</h1>
//       <table className="min-w-full table-auto border-collapse border border-gray-200">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="px-4 py-2 border border-gray-300">Repo Name</th>
//             <th className="px-4 py-2 border border-gray-300">Owner</th>
//             <th className="px-4 py-2 border border-gray-300">Last Commit</th>
//             <th className="px-4 py-2 border border-gray-300">Repo URL</th>
//           </tr>
//         </thead>
//         <tbody>
//           {repos.map((repo) => (
//             <tr key={repo.id} className="odd:bg-white even:bg-gray-50">
//               <td className="px-4 py-2 border border-gray-300">{repo.repoName}</td>
//               <td className="px-4 py-2 border border-gray-300">{repo.ownerName}</td>
//               <td className="px-4 py-2 border border-gray-300">
//                 {repo.latestCommitDate
//                   ? new Date(repo.latestCommitDate).toLocaleString()
//                   : 'No commits yet'}
//               </td>
//               <td className="px-4 py-2 border border-gray-300">
//                 <a href={repo.repoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
//                   View Repo
//                 </a>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Overview;


import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchRepos = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No access token found');
  }

  const response = await axios.get('http://localhost:3000/github/repos/fetchLatest', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.repositories;
};

function Overview() {
  const { data: repos, isLoading, isError, error } = useQuery({
    queryKey: ['githubRepos'],
    queryFn: fetchRepos,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 1,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">GitHub Repositories</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border border-gray-300">Repo Name</th>
            <th className="px-4 py-2 border border-gray-300">Owner</th>
            <th className="px-4 py-2 border border-gray-300">Last Commit</th>
            <th className="px-4 py-2 border border-gray-300">Repo URL</th>
          </tr>
        </thead>
        <tbody>
          {repos.map((repo) => (
            <tr key={repo.id} className="odd:bg-white even:bg-gray-50">
              <td className="px-4 py-2 border border-gray-300">{repo.repoName}</td>
              <td className="px-4 py-2 border border-gray-300">{repo.ownerName}</td>
              <td className="px-4 py-2 border border-gray-300">
                {repo.latestCommitDate
                  ? new Date(repo.latestCommitDate).toLocaleString()
                  : 'No commits yet'}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                <a href={repo.repoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  View Repo
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Overview;
