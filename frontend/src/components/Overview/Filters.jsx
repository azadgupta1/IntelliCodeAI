import React from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";

const Filters = () => (
  <div className='flex space-x-4 items-center'>
    <h4 className='ml-4 text-gray-500'>Filter By</h4>
    <button className="flex items-center px-2 py-2 m-5 bg-white border font-bold border-blue-600 rounded-md shadow-sm hover:bg-gray-50">
      <div className="text-sm font-bold text-blue-700">Re-Sync</div>
      <RiArrowDropDownLine className="h-5 w-5 text-blue-500" />
    </button>
    <button className="flex items-center px-2 py-2 m-5 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
      <div className="text-sm font-medium text-gray-700">Repository</div>
      <RiArrowDropDownLine className="h-5 w-5 text-gray-500" />
    </button>
  </div>
);

export default Filters;
