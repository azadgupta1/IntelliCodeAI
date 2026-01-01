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
