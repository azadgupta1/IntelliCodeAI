import React from "react";
import NoResultImg from "../../../assets/Empty.svg"


const NoResults = () => {
  return (
    <div className="flex justify-center items-center p-10">
      <div className="flex flex-col items-center w-82 h-76 bg-white shadow-lg rounded-lg p-6 space-y-4">
        <div className="flex justify-center items-center">
          <img
            src={NoResultImg}
            alt="No results"
            className="mt-10 w-30 h-30"
          />
        </div>
        <div className="text-center">
          <h4 className="text-xl font-semibold text-gray-800">All clear!</h4>
          <p className="text-sm text-gray-600 mt-2">
            When pull requests are open, you'll be able to see here an overview of the status.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoResults;
