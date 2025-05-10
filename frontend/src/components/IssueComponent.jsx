import { FaEllipsisH } from 'react-icons/fa';
import { IoDocumentOutline } from 'react-icons/io5';
import { IoChevronDown } from 'react-icons/io5';
import { IoBarChart } from 'react-icons/io5';

const IssueComponent = () => {
  return (
    <div className="border border-gray-200 rounded-md p-4 bg-white shadow-md w-full max-w-3xl">
      {/* Header */}
      <div className="flex justify-between items-center cursor-pointer">
        <div className="flex items-center space-x-4">
          {/* Icon + Severity */}
          <div className="flex items-center space-x-2 text-red-600 font-semibold">
            <IoBarChart className="w-5 h-5" />
            <span>CRITICAL</span>
          </div>
          {/* Message */}
          <p className="text-gray-800 font-medium">Error prone</p>
        </div>

        {/* Status */}
        <div className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full text-sm">
          Fixed
        </div>

        {/* Options */}
        <button className="text-gray-500 hover:text-gray-700">
          <FaEllipsisH className="w-5 h-5" />
        </button>

        {/* Dropdown Icon */}
        <IoChevronDown className="text-gray-500 w-5 h-5" />
      </div>

      {/* Message */}
      <p className="mt-2 text-sm text-gray-700 font-medium">
        'w' is assigned a value but never used.
      </p>

      {/* File path */}
      <div className="mt-3 flex items-center text-sm text-gray-600 space-x-2">
        <IoDocumentOutline className="w-5 h-5 text-gray-500" />
        <span>Blogger/backend/controllers/</span>
        <span className="font-semibold">hello.js</span>
      </div>

      {/* Code Block */}
      <pre className="mt-3 bg-gray-100 text-sm rounded-md overflow-x-auto">
        <code className="block px-4 py-2 text-gray-800">
          <span className="text-gray-400 select-none">8 </span>
          <span>
            <span className="text-purple-600">const</span>{' '}
            <span className="text-blue-600">w</span>{' '}
            <span className="text-gray-700">=</span>{' '}
            <span className="text-pink-600">2</span>
            <span className="text-gray-700">;</span>
          </span>
        </code>
      </pre>
    </div>
  );
};

export default IssueComponent;
