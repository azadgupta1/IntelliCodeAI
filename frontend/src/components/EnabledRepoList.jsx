// import React from "react";

// const EnabledRepoList = ({ enabledRepos, onSelect }) => {
//   if (enabledRepos.length === 0) return <p>No auto-analyzed repositories found.</p>;

//   return (
//     <div>
//       <h3 className="font-semibold text-lg mb-4">Select a Repository:</h3>
//       <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Repository Name</th>
//             <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Error Count</th>
//             <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Last Commit</th>
//           </tr>
//         </thead>
//         <tbody>
//           {enabledRepos.map((repo) => (
//             <tr
//               key={repo.repoName}
//               className="cursor-pointer hover:bg-gray-50 transition"
//               onClick={() => onSelect(repo.ownerName, repo.repoName)}
//             >
//               <td className="px-6 py-4 text-sm text-gray-800">{repo.repoName}</td>
//               <td className="px-6 py-4 text-sm text-gray-600">{repo.errorCount}</td>
//               <td className="px-6 py-4 text-sm text-gray-500">
//                 {new Date(repo.lastCommitAt).toLocaleString()}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EnabledRepoList;









// import React from "react";

// const EnabledRepoList = ({ enabledRepos, onSelect }) => {
//   if (enabledRepos.length === 0)
//     return (
//       <p className="text-gray-600 text-sm italic">
//         No auto-analyzed repositories found.
//       </p>
//     );

//   return (
//     <div className="w-full overflow-x-auto">
//       <h3 className="text-xl font-semibold text-gray-800 mb-4">
//         Select a Repository
//       </h3>

//       <table className="min-w-full table-auto bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
//         <thead className="bg-slate-50 border-b border-gray-200">
//           <tr>
//             <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
//               Repository Name
//             </th>
//             <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
//               Error Count
//             </th>
//             <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
//               Last Commit
//             </th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-100">
//           {enabledRepos.map((repo) => (
//             <tr
//               key={repo.repoName}
//               className="hover:bg-slate-100 cursor-pointer transition-all"
//               onClick={() => onSelect(repo.ownerName, repo.repoName)}
//             >
//               <td className="px-6 py-4 text-sm text-gray-900 font-medium whitespace-nowrap">
//                 {repo.repoName}
//               </td>
//               <td className="px-6 py-4 text-sm text-gray-700">
//                 {repo.errorCount}
//               </td>
//               <td className="px-6 py-4 text-sm text-gray-500">
//                 {repo.lastCommitAt
//                   ? new Date(repo.lastCommitAt).toLocaleString()
//                   : "N/A"}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EnabledRepoList;


























const EnabledRepoList = ({ enabledRepos, onSelect }) => {
  if (enabledRepos.length === 0)
    return (
      <p className="text-sm text-slate-500">
        No repositories currently have auto-analysis enabled.
      </p>
    );

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-slate-900">
          Analyzed Repositories
        </h3>
        <p className="text-sm text-slate-500">
          Select a repository to view commits and analysis results
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-slate-600">
                Repository
              </th>
              <th className="px-6 py-3 text-left font-medium text-slate-600">
                Errors
              </th>
              <th className="px-6 py-3 text-left font-medium text-slate-600">
                Last Commit
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {enabledRepos.map((repo) => (
              <tr
                key={repo.repoName}
                onClick={() =>
                  onSelect(repo.ownerName, repo.repoName)
                }
                className="bg-slate-50/40 hover:bg-slate-100 cursor-pointer transition"
              >
                <td className="px-6 py-4 font-medium text-slate-900">
                  {repo.repoName}
                </td>
                <td className="px-6 py-4 text-slate-700">
                  {repo.errorCount}
                </td>
                <td className="px-6 py-4 text-slate-500">
                  {repo.lastCommitAt
                    ? new Date(repo.lastCommitAt).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnabledRepoList;
