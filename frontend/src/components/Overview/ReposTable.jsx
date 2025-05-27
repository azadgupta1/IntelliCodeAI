import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { FaBug, FaFolderOpen } from "react-icons/fa6";

const ReposTable = ({ repos }) => {
  const navigate = useNavigate();

  return (
    <table className="w-300 border-collapse border border-gray-200 mt-6">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 border-gray-300 text-left text-gray-400">
            <FaFolderOpen className='inline-block mr-2' /> Repository
          </th>
          <th className="px-4 py-2 border-gray-300 text-center text-gray-400">
            <FaBug className='inline-block mr-2' /> Issues
          </th>
          <th className="px-4 py-2 border-gray-300 text-center text-gray-400">Last Commit</th>
        </tr>
      </thead>
      <tbody>
        {repos.map((repo) => (
          <tr
            key={repo.id}
            className="odd:bg-white even:bg-gray-50 cursor-pointer hover:bg-blue-50 transition"
            onClick={() => navigate(`/repositories/${repo.ownerName}/${repo.repoName}`)}
          >
            <td className="px-4 py-2 border-gray-300">
              <div className="font-medium">{repo.repoName}</div>
              <div className="text-sm text-gray-400">{repo.ownerName}</div>
            </td>
            <td
              className={`px-4 py-2 border-gray-300 text-center ${
                repo.errorCount === 0
                  ? 'text-green-400'
                  : repo.errorCount < 5
                  ? 'text-yellow-600'
                  : repo.errorCount <= 10
                  ? 'text-orange-600'
                  : 'text-red-500'
              }`}
            >
              {repo.errorCount}
            </td>
            <td className="px-4 py-2 border-gray-300 text-center">
              {repo.latestCommitDate
                ? `${formatDistanceToNow(new Date(repo.latestCommitDate), { addSuffix: true })}`
                : 'No commits yet'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReposTable;
