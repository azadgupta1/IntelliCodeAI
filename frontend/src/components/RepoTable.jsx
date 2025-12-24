// import React from "react";
// import { Switch } from "@headlessui/react";

// const RepoTable = ({
//   filteredRepos,
//   navigate,
//   searchTerm,
//   setSearchTerm,
//   filter,
//   setFilter,
//   showManageBox,
//   setShowManageBox,
//   toggleAutoAnalysis
// }) => {
//   return (
//     <>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold">🔍 Auto-Analysis Status</h2>
//         <button
//           onClick={() => setShowManageBox(!showManageBox)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
//         >
//           {showManageBox ? "Close" : " +  Manage Repositories"}
//         </button>
//       </div>

//       {showManageBox && (
//         <div className="mb-8 border p-4 rounded-lg shadow-md bg-gray-50">
//           <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
//             <input
//               type="text"
//               placeholder="Search repositories..."
//               className="w-full sm:w-1/2 border px-4 py-2 rounded-md"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />

//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="border px-4 py-2 rounded-md"
//             >
//               <option value="all">All</option>
//               <option value="enabled">Auto-Analysis Enabled</option>
//               <option value="disabled">Auto-Analysis Disabled</option>
//             </select>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full table-auto border-collapse border border-gray-200">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="p-4 border-b">Repo Name</th>
//                   <th className="p-4 border-b">Issues</th>
//                   <th className="p-4 border-b">Last Updated</th>
//                   <th className="p-4 border-b">Actions</th>
//                   <th className="p-4 border-b">Auto-Analysis</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredRepos.length === 0 ? (
//                   <tr>
//                     <td colSpan="5" className="p-4 text-center text-gray-500">
//                       No repositories found.
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredRepos.map((repo) => (
//                     <tr key={repo.repoUrl} className="hover:bg-gray-50">
//                       <td className="p-4 border-b font-medium">{repo.repoName}</td>
//                       <td className="p-4 border-b">{repo.issues || 0}</td>
//                       <td className="p-4 border-b">
//                         {new Date(repo.lastUpdated).toLocaleDateString()}
//                       </td>
//                       <td className="p-4 border-b">
//                         <button
//                           className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-xs"
//                           onClick={() =>
//                             navigate(`/github/${repo.ownerName}/${repo.repoName}/analyze`)
//                           }
//                         >
//                           Analyze
//                         </button>
//                       </td>
//                       <td className="p-4 border-b">
//                         <Switch
//                           checked={repo.autoAnalyze}
//                           onChange={() => toggleAutoAnalysis(repo)}
//                           className={`${
//                             repo.autoAnalyze ? "bg-green-500" : "bg-gray-300"
//                           } relative inline-flex h-6 w-11 items-center rounded-full`}
//                         >
//                           <span className="sr-only">Enable Auto-Analysis</span>
//                           <span
//                             className={`${
//                               repo.autoAnalyze ? "translate-x-6" : "translate-x-1"
//                             } inline-block h-4 w-4 transform rounded-full bg-white transition`}
//                           />
//                         </Switch>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default RepoTable;









// import React from "react";
// import ManageRepositoriesModal from "./ManageRepositoriesModal";

// const RepoTable = ({
//   filteredRepos,
//   navigate,
//   searchTerm,
//   setSearchTerm,
//   filter,
//   setFilter,
//   showManageBox,
//   setShowManageBox,
//   toggleAutoAnalysis
// }) => {
//   return (
//     <>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold ml-5 px-10">🔍 Auto-Analysis Status</h2>
//         <button
//           onClick={() => setShowManageBox(!showManageBox)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
//         >
//           {showManageBox ? "Close" : "+ Manage Repositories"}
//         </button>
//       </div>

//       {showManageBox && (
//         <ManageRepositoriesModal
//           filteredRepos={filteredRepos}
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           filter={filter}
//           setFilter={setFilter}
//           toggleAutoAnalysis={toggleAutoAnalysis}
//           navigate={navigate}
//           onClose={() => setShowManageBox(false)}
//         />
//       )}
//     </>
//   );
// };

// export default RepoTable;






















import React from "react";
import ManageRepositoriesModal from "./ManageRepositoriesModal";


const RepoTable = ({
  filteredRepos,
  navigate,
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  showManageBox,
  setShowManageBox,
  toggleAutoAnalysis,
}) => {
  return (
    <>
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
        <div>
          <h2 className="text-lg font-medium text-slate-900">
            Auto-Analysis Control
          </h2>
          <p className="text-sm text-slate-500">
            Enable or disable automatic analysis per repository
          </p>
        </div>

        <button
          onClick={() => setShowManageBox(!showManageBox)}
          className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
        >
          {showManageBox ? "Close Manager" : "Manage Repositories"}
        </button>
      </div>

      {showManageBox && (
        <ManageRepositoriesModal
          filteredRepos={filteredRepos}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filter={filter}
          setFilter={setFilter}
          toggleAutoAnalysis={toggleAutoAnalysis}
          navigate={navigate}
          onClose={() => setShowManageBox(false)}
        />
      )}
    </>
  );
};

export default RepoTable;
