import React from "react";
import ManageRepositoriesModal from "../../ManageRepositoriesModal";


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
