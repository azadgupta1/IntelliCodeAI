import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchRepos } from '../../components/OverviewComponents/Overview/fetchRepos';
import Filters from '../../components/OverviewComponents/Overview/Filters';
import ChartSection from '../../components/OverviewComponents/Overview/ChartSection';
import OnboardingSection from '../../components/OverviewComponents/Overview/OnboardingSection';
import ReposTable from '../../components/OverviewComponents/Overview/ReposTable';
import EmptyState from '../../components/OverviewComponents/Overview/EmptyState';
import ChatBot from '../Organisations/Chatbot';


function Overview() {
  const { username } = useParams();

  const { data: repos = [], isLoading, isError, error } = useQuery({
    queryKey: ['githubRepos'],
    queryFn: fetchRepos,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const chartData = repos.map(r => ({
    id: r.id,
    Blogger: r.repoName,
    Errors: r.errorCount === 0 ? 0.02 : r.errorCount,
    ownerName: r.ownerName,
    repoName: r.repoName,
  }));

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-full min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (isError) return <div className="p-4">{error.message}</div>;

  const isEmpty = repos.length === 0;

  return (
    <div className="w-full min-h-screen px-3 sm:px-6 py-4 bg-gray-50">
      
      {/* Header */}
      <h1 className="text-xl sm:text-2xl font-bold mb-4 truncate">
        {username}
      </h1>

      {/* Filters */}
      <div className="mb-4">
        <Filters />
      </div>

      {/* Chart + Onboarding */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 bg-white rounded-lg shadow-sm p-3 overflow-x-auto">
          {isEmpty ? <EmptyState /> : <ChartSection data={chartData} />}
        </div>

        <div className="w-full lg:w-80 bg-white rounded-lg shadow-sm p-3">
          <OnboardingSection />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto mb-16">
        <ReposTable repos={repos} />
      </div>

      {/* Chatbot */}
      <ChatBot />
    </div>
  );
}

export default Overview;
