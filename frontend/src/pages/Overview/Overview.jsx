// import React from 'react';
// import axios from 'axios';
// import { useQuery } from '@tanstack/react-query';

// const fetchRepos = async () => {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     throw new Error('No access token found');
//   }

//   const response = await axios.get('http://localhost:3000/github/repos/fetchLatest', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response.data.repositories;
// };

// function Overview() {
//   const { data: repos, isLoading, isError, error } = useQuery({
//     queryKey: ['githubRepos'],
//     queryFn: fetchRepos,
//     staleTime: 5 * 60 * 1000, // Cache for 5 minutes
//     retry: 1,
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>{error.message}</div>;

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

// import React from 'react';
// import axios from 'axios';
// import { useQuery } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom'; // 👈 import navigate

// const fetchRepos = async () => {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     throw new Error('No access token found');
//   }

//   const response = await axios.get('http://localhost:3000/github/repos/fetchLatest', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   console.log(response);

//   return response.data.repositories;
// };

// function Overview() {
//   const navigate = useNavigate(); // 👈 initialize navigate

//   const { data: repos, isLoading, isError, error } = useQuery({
//     queryKey: ['githubRepos'],
//     queryFn: fetchRepos,
//     staleTime: 5 * 60 * 1000,
//     retry: 1,
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>{error.message}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">GitHub Repositories</h1>
//       <table className="min-w-full table-auto border-collapse border border-gray-200">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="px-4 py-2 border border-gray-300">Repo Name</th>
//             <th className="px-4 py-2 border border-gray-300">Owner</th>
//             <th className="px-4 py-2 border border-gray-300">Number of Issues</th>
//             <th className="px-4 py-2 border border-gray-300">Last Commit</th>
//             <th className="px-4 py-2 border border-gray-300">Repo URL</th>
//           </tr>
//         </thead>
//         <tbody>
//           {repos.map((repo) => (
//             <tr
//               key={repo.id}
//               className="odd:bg-white even:bg-gray-50 cursor-pointer hover:bg-blue-50 transition"
//               onClick={() => navigate(`/repositories/${repo.ownerName}/${repo.repoName}`)} // 👈 navigate on click
//             >
//               <td className="px-4 py-2 border border-gray-300">{repo.repoName}</td>
//               <td className="px-4 py-2 border border-gray-300">{repo.ownerName}</td>
//               <td className="px-4 py-2 border border-gray-300">{repo.errorCount}</td>
//               <td className="px-4 py-2 border border-gray-300">
//                 {repo.latestCommitDate
//                   ? new Date(repo.latestCommitDate).toLocaleString()
//                   : 'No commits yet'}
//               </td>
//               <td className="px-4 py-2 border border-gray-300">
//                 <a
//                   href={repo.repoUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 underline"
//                   onClick={(e) => e.stopPropagation()} // prevent row click when this is clicked
//                 >
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




// import React from 'react';
// import axios from 'axios';
// import { useQuery } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
//   Legend,
// } from 'recharts';

// const fetchRepos = async () => {
//   const token = localStorage.getItem('token');
//   if (!token) throw new Error('No access token found');

//   const response = await axios.get('http://localhost:3000/github/repos/fetchLatest', {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   return response.data.repositories;
// };

// function Overview() {
//   const navigate = useNavigate();

//   const { data: repos, isLoading, isError, error } = useQuery({
//     queryKey: ['githubRepos'],
//     queryFn: fetchRepos,
//     staleTime: 5 * 60 * 1000,
//     retry: 1,
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>{error.message}</div>;

//   // 📊 Filter for chart: only repos with errorCount > 0
//   const chartData = repos
//     .filter((repo) => repo.errorCount > 0)
//     .map((repo) => ({
//       Blogger: repo.repoName,
//       Errors: repo.errorCount,
//     }));

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">GitHub Repositories</h1>

//       {/* 📈 Error Count Bar Chart */}
//       {chartData.length > 0 && (
//         <div className="bg-white shadow-md rounded-lg p-4 mb-6">
//           <h2 className="text-xl font-semibold mb-4">Error Count by Blogger</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="Blogger" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="Errors" fill="#3b82f6" radius={[5, 5, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       )}

//       {/* 📋 Repositories Table */}
//       <table className="min-w-full table-auto border-collapse border border-gray-200">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="px-4 py-2 border border-gray-300">Repo Name</th>
//             <th className="px-4 py-2 border border-gray-300">Owner</th>
//             <th className="px-4 py-2 border border-gray-300">Number of Issues</th>
//             <th className="px-4 py-2 border border-gray-300">Last Commit</th>
//             <th className="px-4 py-2 border border-gray-300">Repo URL</th>
//           </tr>
//         </thead>
//         <tbody>
//           {repos.map((repo) => (
//             <tr
//               key={repo.id}
//               className="odd:bg-white even:bg-gray-50 cursor-pointer hover:bg-blue-50 transition"
//               onClick={() => navigate(`/repositories/${repo.ownerName}/${repo.repoName}`)}
//             >
//               <td className="px-4 py-2 border border-gray-300">{repo.repoName}</td>
//               <td className="px-4 py-2 border border-gray-300">{repo.ownerName}</td>
//               <td className="px-4 py-2 border border-gray-300">{repo.errorCount}</td>
//               <td className="px-4 py-2 border border-gray-300">
//                 {repo.latestCommitDate
//                   ? new Date(repo.latestCommitDate).toLocaleString()
//                   : 'No commits yet'}
//               </td>
//               <td className="px-4 py-2 border border-gray-300">
//                 <a
//                   href={repo.repoUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 underline"
//                   onClick={(e) => e.stopPropagation()}
//                 >
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
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';

const fetchRepos = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No access token found');

  const response = await axios.get('http://localhost:3000/github/repos/fetchLatest', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.repositories;
};

function Overview() {
  const navigate = useNavigate();

  const { data: repos, isLoading, isError, error } = useQuery({
    queryKey: ['githubRepos'],
    queryFn: fetchRepos,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  // 📊 Filter for chart: only repos with errorCount > 0
  const chartData = repos
    .filter((repo) => repo.errorCount > 0)
    .map((repo) => ({
      id: repo.id,
      Blogger: repo.repoName,
      Errors: repo.errorCount,
      ownerName: repo.ownerName,
      repoName: repo.repoName,
    }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">GitHub Repositories</h1>

      {/* 📈 Error Count Bar Chart */}
      {chartData.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Error Count by Blogger</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              barSize={30} // 🎯 Narrower bars
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Blogger" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="Errors"
                fill="#3b82f6"
                radius={[5, 5, 0, 0]}
                onClick={(data) => navigate(`/repositories/${data.ownerName}/${data.repoName}`)}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={`cell-${entry.id}`}
                    cursor="pointer"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* 📋 Repositories Table */}
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border border-gray-300">Repo Name</th>
            <th className="px-4 py-2 border border-gray-300">Owner</th>
            <th className="px-4 py-2 border border-gray-300">Number of Issues</th>
            <th className="px-4 py-2 border border-gray-300">Last Commit</th>
            <th className="px-4 py-2 border border-gray-300">Repo URL</th>
          </tr>
        </thead>
        <tbody>
          {repos.map((repo) => (
            <tr
              key={repo.id}
              className="odd:bg-white even:bg-gray-50 cursor-pointer hover:bg-blue-50 transition"
              onClick={() => navigate(`/repositories/${repo.ownerName}/${repo.repoName}`)}
            >
              <td className="px-4 py-2 border border-gray-300">{repo.repoName}</td>
              <td className="px-4 py-2 border border-gray-300">{repo.ownerName}</td>
              <td className="px-4 py-2 border border-gray-300">{repo.errorCount}</td>
              <td className="px-4 py-2 border border-gray-300">
                {repo.latestCommitDate
                  ? new Date(repo.latestCommitDate).toLocaleString()
                  : 'No commits yet'}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                <a
                  href={repo.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                  onClick={(e) => e.stopPropagation()}
                >
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
