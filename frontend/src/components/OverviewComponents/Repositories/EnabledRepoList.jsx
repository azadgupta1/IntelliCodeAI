const EnabledRepoList = ({ enabledRepos, onSelect }) => {
  if (enabledRepos.length === 0)
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-sm text-slate-600">
          No repositories currently have auto-analysis enabled.
        </p>
      </div>
    );

  return (
    <div>
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-lg font-medium text-slate-900">
          Analyzed Repositories
        </h3>
        <p className="text-sm text-slate-500">
          Select a repository to view commits and analysis results
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-slate-600">
                Repository
              </th>
              <th className="px-6 py-3 text-left font-medium text-slate-600">
                Issues Detected
              </th>
              <th className="px-6 py-3 text-left font-medium text-slate-600">
                Last Commit
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {enabledRepos.map((repo) => {
              const hasErrors = repo.errorCount > 0;

              return (
                <tr
                  key={repo.repoName}
                  onClick={() =>
                    onSelect(repo.ownerName, repo.repoName)
                  }
                  className="
                    group cursor-pointer transition
                    hover:bg-slate-50
                  "
                >
                  {/* Repository */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Accent bar */}
                      <span
                        className={`h-8 w-1 rounded-full ${
                          hasErrors
                            ? "bg-amber-400"
                            : "bg-emerald-400"
                        }`}
                      />

                      <div>
                        <p className="font-medium text-slate-900 group-hover:text-indigo-600 transition">
                          {repo.repoName}
                        </p>
                        <p className="text-xs text-slate-500">
                          {repo.ownerName}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Errors */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                        ${
                          hasErrors
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }
                      `}
                    >
                      {hasErrors
                        ? `${repo.errorCount} issues`
                        : "No issues"}
                    </span>
                  </td>

                  {/* Last Commit */}
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {repo.lastCommitAt
                      ? new Date(repo.lastCommitAt).toLocaleString()
                      : "No recent commits"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnabledRepoList;
