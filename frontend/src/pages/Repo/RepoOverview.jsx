import React, { useEffect, useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRepoErrors } from '../../services/githubServices';
import RepoErrorChart from '../../components/RepoErrorChart'; // 👈 import chart
import IssuesBreakdown from '../../components/IssuesBreakdown';
import NoResults from '../../components/NoResult';
import { IoGitBranch } from 'react-icons/io5';

function RepoOverview() {
  const { owner, repo } = useParams();
  const navigate = useNavigate();
  const [errorCount, setErrorCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [repoId, setRepoId] = useState(null); // assuming you get repoId from API
  const [range, setRange] = useState('7d');

  useEffect(() => {
    const getErrors = async () => {
      setLoading(true);
      const data = await fetchRepoErrors(owner, repo);

      console.log(data);
      if (data.success) {
        setErrorCount(data.data.errorCount);
        setRepoId(data.data.id); // include repoId in response or fetch it
      } else {
        console.error(data.message);
      }
      setLoading(false);
    };
    getErrors();
  }, [owner, repo]);

  const handleClick = () => {
    navigate(`/repositories/${owner}/${repo}/issues`);
  };

  if (loading) return <div className="p-4">Loading error data...</div>;


  return (
    <div className="p-4">
      <div className='flex items-center'>
        <h1 className='text-2xl font-bold p-4'>{repo}</h1>

        <div className='flex items-center h-8 bg-green-100 bg-opacity-50 px-1 py-1 rounded-md'>
          <IoGitBranch className='mx-1 text-green-700 font-bold'/>
          <span className='text-green-700 font-bold'>main branch</span>
        </div>

      </div>
      
      <div className="space-y-4 ">
      {/* Range Buttons */}

      
      
      
      <div className="flex space-x-4 justify-end ">

        <button
          className={`text-sm font-medium hover:cursor-pointer ${
            range === '7d' ? 'text-blue-600 underline' : 'text-gray-600'
          }`}
          onClick={() => setRange('7d')}
        >
          Last 7 Days
        </button>
        <button
          className={`text-sm font-medium hover:cursor-pointer ${
            range === '31d' ? 'text-blue-600 underline' : 'text-gray-600'
          }`}
          onClick={() => setRange('31d')}
        >
          Last 31 Days
        </button>
        <button
          className={`text-sm font-medium hover:cursor-pointer ${
            range === '3m' ? 'text-blue-600 underline' : 'text-gray-600'
          }`}
          onClick={() => setRange('3m')}
        >
          Last 3 Months
        </button>
      </div>



      {/* Chart Component */}
      {repoId && <RepoErrorChart repoId={repoId} range={range} errorCount={errorCount} />}
    </div>

      {/* {repoId && <RepoErrorChart repoId={repoId} range="7d" />} */}


      <div className='flex justify-center'>
        <div>
          <IssuesBreakdown />
        </div>

        <div>
          <NoResults />
        </div>

        <div>
          <IssuesBreakdown />
        </div>

      </div>

      {/* <div className="flex justify-end mb-4">
        <div
          onClick={handleClick}
          className="flex items-center bg-red-100 text-red-600 border border-red-300 rounded-md px-4 py-2 shadow space-x-3 cursor-pointer hover:bg-red-200 transition-all"
          title="Go to Issues"
        >
          <span className="text-xl">Total Number of Errors: {errorCount}</span>
          <FaExclamationTriangle className="text-2xl" />
        </div>
      </div> */}
    </div>
    
  );
}

export default RepoOverview;
