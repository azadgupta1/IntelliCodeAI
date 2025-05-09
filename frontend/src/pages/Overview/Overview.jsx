import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";
import { CheckCircle, HelpCircle, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';


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
  const { username } = useParams();

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

  const onboardingSteps = [
  {
    id: 'enableStatusChecks',
    label: 'Enable status checks',
    status: 'completed',
    actionLabel: 'Edit',
    link: '/organizations/gh/azadgupta1/integrations/provider',
  },
  {
    id: 'addRepositories',
    label: 'Add repositories',
    status: 'completed',
    actionLabel: 'Add',
    link: '/organizations/gh/azadgupta1/dashboard/add',
  },
  {
    id: 'createDefaultCodingStandard',
    label: 'Create default coding standard',
    status: 'pending',
    actionLabel: 'Add',
    link: '/organizations/gh/azadgupta1/policies/coding-standards',
  },
];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl m-5 font-bold mb-6">{username}</h1>

      <div className='flex space-x-4 items-center'>
        <h4 className='ml-4 text-gray-500'>Filter By</h4>
        <button
          aria-haspopup="true"
          aria-expanded="false"
          className="flex items-center justify-between px-2 py-2 w-25 mx-2 m-5 bg-white border font-bold border-blue-600 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <div className="text-sm font-bold text-blue-700">Re-Sync</div>
          <RiArrowDropDownLine className="h-5 w-5 text-blue-500" />
      </button>
        <button
          aria-haspopup="true"
          aria-expanded="false"
          className="flex items-center justify-between px-2 py-2 w-30 mx-2 m-5 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <div className="text-sm font-medium text-gray-700">Repository</div>
          <RiArrowDropDownLine className="h-5 w-5 text-gray-500" />
      </button>
    </div>

      <div className='flex'>
      {/* 📊 Professional Error Count Bar Chart */}
        {chartData.length > 0 && (
          <div className="bg-white shadow-lg w-200 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 ml-4">Error Overview</h2>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                barSize={60} // Slightly wider bars
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="Blogger" tick={{ fill: '#4B5563', fontSize: 14 }} />
                <YAxis tick={{ fill: '#4B5563', fontSize: 14 }} />
                <Tooltip
                  cursor={{ fill: 'rgba(156, 163, 175, 0.1)' }}
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Bar
                  dataKey="Errors"
                  fill="#38bdf8"
                  onClick={(data) => navigate(`/repositories/${data.ownerName}/${data.repoName}`)}
                >
                  {chartData.map((entry) => (
                    <Cell
                      key={`cell-${entry.id}`}
                      cursor="pointer"
                      radius={[0, 0, 0, 0]} // No rounding on top
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

<div className="bg-gray-100 rounded-lg shadow-md p-6 space-y-6 h-90 w-100 mx-auto">
      <p className="text-gray-700 text-lg font-medium">
        Configure key defaults and optimize Codacy for your organization.
      </p>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded">
        <div className="h-2 bg-blue-500 rounded" style={{ width: '66%' }}></div>
      </div>
      <p className="text-sm text-gray-600">2/3 completed</p>

      {/* Onboarding Steps */}
      <div className="space-y-5">
        {onboardingSteps.map((step) => (
          <div key={step.id} className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {step.status === 'completed' ? (
                <CheckCircle className="text-green-600 w-5 h-5" />
              ) : (
                <Circle className="text-gray-400 w-5 h-5" />
              )}
              <p className="text-gray-800">{step.label}</p>
              <HelpCircle className="text-gray-400 w-4 h-4" title="More info" />
            </div>
            <Link to={step.link}>
              <button className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded">
                {step.actionLabel}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
</div>

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
