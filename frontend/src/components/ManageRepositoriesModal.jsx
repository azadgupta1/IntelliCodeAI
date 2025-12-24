// // ManageRepositoriesModal.js
// import React from "react";
// import { Switch } from "@headlessui/react";

// const ManageRepositoriesModal = ({
//   filteredRepos,
//   searchTerm,
//   setSearchTerm,
//   filter,
//   setFilter,
//   toggleAutoAnalysis,
//   navigate,
//   onClose
// }) => {
//   return (
//     <>
//       {/* Dimmed background */}
//       <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40" onClick={onClose} />

//       {/* Modal content */}
//       <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl bg-white rounded-lg shadow-lg p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">Manage Repositories</h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-sm">
//             ✕ Close
//           </button>
//         </div>

//         <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
//           <input
//             type="text"
//             placeholder="Search repositories..."
//             className="w-full sm:w-1/2 border px-4 py-2 rounded-md"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />

//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="border px-4 py-2 rounded-md"
//           >
//             <option value="all">All</option>
//             <option value="enabled">Auto-Analysis Enabled</option>
//             <option value="disabled">Auto-Analysis Disabled</option>
//           </select>
//         </div>

//         <div className="overflow-x-auto max-h-[50vh] overflow-y-auto">
//           <table className="min-w-full table-auto border-collapse border border-gray-200">
//             <thead className="bg-gray-100 sticky top-0">
//               <tr>
//                 <th className="p-4 border-b">Repo Name</th>
//                 <th className="p-4 border-b">Issues</th>
//                 <th className="p-4 border-b">Last Updated</th>
//                 <th className="p-4 border-b">Actions</th>
//                 <th className="p-4 border-b">Auto-Analysis</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredRepos.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="p-4 text-center text-gray-500">
//                     No repositories found.
//                   </td>
//                 </tr>
//               ) : (
//                 filteredRepos.map((repo) => (
//                   <tr key={repo.repoUrl} className="hover:bg-gray-50">
//                     <td className="p-4 border-b font-medium">{repo.repoName}</td>
//                     <td className="p-4 border-b">{repo.issues || 0}</td>
//                     <td className="p-4 border-b">
//                       {new Date(repo.lastUpdated).toLocaleDateString()}
//                     </td>
//                     <td className="p-4 border-b">
//                       <button
//                         className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-xs"
//                         onClick={() =>
//                           navigate(`/github/${repo.ownerName}/${repo.repoName}/analyze`)
//                         }
//                       >
//                         Analyze
//                       </button>
//                     </td>
//                     <td className="p-4 border-b">
//                       <Switch
//                         checked={repo.autoAnalyze}
//                         onChange={() => toggleAutoAnalysis(repo)}
//                         className={`${
//                           repo.autoAnalyze ? "bg-green-500" : "bg-gray-300"
//                         } relative inline-flex h-6 w-11 items-center rounded-full`}
//                       >
//                         <span className="sr-only">Enable Auto-Analysis</span>
//                         <span
//                           className={`${
//                             repo.autoAnalyze ? "translate-x-6" : "translate-x-1"
//                           } inline-block h-4 w-4 transform rounded-full bg-white transition`}
//                         />
//                       </Switch>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ManageRepositoriesModal;


















import React from "react";
import { Switch } from "@headlessui/react";

const ManageRepositoriesModal = ({
  filteredRepos,
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  toggleAutoAnalysis,
  navigate,
  onClose,
}) => {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="w-full max-w-5xl rounded-2xl bg-white shadow-xl border border-slate-200">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Manage Repositories
              </h3>
              <p className="text-sm text-slate-500">
                Control auto-analysis and manual scans
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-sm text-slate-500 hover:text-slate-700 transition"
            >
              Close
            </button>
          </div>

          {/* Controls */}
          <div className="px-6 py-4 flex flex-col sm:flex-row gap-4 border-b border-slate-200">
            <input
              type="text"
              placeholder="Search repositories"
              className="w-full sm:w-1/2 rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full sm:w-56 rounded-lg border border-slate-300 px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              <option value="all">All repositories</option>
              <option value="enabled">Auto-analysis enabled</option>
              <option value="disabled">Auto-analysis disabled</option>
            </select>
          </div>

          {/* Table */}
          <div className="max-h-[55vh] overflow-y-auto">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-slate-600">
                    Repository
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-slate-600">
                    Issues
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-slate-600">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-slate-600">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-slate-600">
                    Auto-Analysis
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredRepos.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-10 text-center text-slate-500"
                    >
                      No repositories found.
                    </td>
                  </tr>
                ) : (
                  filteredRepos.map((repo) => (
                    <tr
                      key={repo.repoUrl}
                      className="hover:bg-slate-50 transition"
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {repo.repoName}
                      </td>

                      <td className="px-6 py-4 text-slate-700">
                        {repo.issues || 0}
                      </td>

                      <td className="px-6 py-4 text-slate-500">
                        {repo.lastUpdated
                          ? new Date(repo.lastUpdated).toLocaleDateString()
                          : "—"}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            navigate(
                              `/github/${repo.ownerName}/${repo.repoName}/analyze`
                            )
                          }
                          className="text-sm font-medium text-slate-700 hover:text-slate-900 transition"
                        >
                          Run analysis
                        </button>
                      </td>

                      <td className="px-6 py-4">
                        <Switch
                          checked={repo.autoAnalyze}
                          onChange={() => toggleAutoAnalysis(repo)}
                          className={`${
                            repo.autoAnalyze
                              ? "bg-slate-900"
                              : "bg-slate-300"
                          } relative inline-flex h-5 w-10 items-center rounded-full transition`}
                        >
                          <span
                            className={`${
                              repo.autoAnalyze
                                ? "translate-x-5"
                                : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                          />
                        </Switch>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageRepositoriesModal;
