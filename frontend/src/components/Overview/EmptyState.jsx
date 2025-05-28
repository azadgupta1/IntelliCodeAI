// import React from "react";
// import EmptyDesk from "../../assets/EmptyDesk.svg";
// import { Link } from "react-router-dom"; // Optional if using React Router

// const EmptyState = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center">
//       {/* 👉 Paste your SVG below */}
//       <div className="mb-6">
//         <img src={EmptyDesk} alt="Empty state" className="w-48 h-48" />
//         {/* ⬇️ Paste your inline SVG here ⬇️ */}
//       </div>

//       <p className="text-lg text-gray-700 mb-4 font-bold">
//         Seems like there are no commits or repositories to analyze yet
//       </p>

//       <div className="text-sm text-gray-600">
//         <Link to="/organizations/gh/temba759/dashboard/add" className="text-blue-600 hover:underline">
//           Add
//         </Link>{" "}
//         or{" "}
//         <Link to="/organizations/gh/temba759/repositories" className="text-blue-600 hover:underline">
//           follow
//         </Link>{" "}
//         your GitHub repositories to get your first analysis. Make sure you have permissions to the repositories you want to add or follow.
//         <br />
//         <a
//           href="https://docs.codacy.com/organizations/organization-overview"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-flex items-center gap-1 text-blue-600 hover:underline mt-2"
//         >
//           Learn more about it here
//           <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48M336 64h112v112M224 288L440 72" />
//           </svg>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default EmptyState;



import React from "react";
import EmptyDesk from "../../assets/EmptyDesk.svg";
import { Link } from "react-router-dom";

const EmptyState = () => {
  return (
    <div className="flex items-center justify-center min-h-[500px] min-w-[700px] p-4 pt-0">
      <div className="bg-white shadow-md rounded-lg p-4 pt-0 text-center w-[600px] h-[380px]">
        {/* 👉 SVG Image */}
        <div className="mb-6">
          <img src={EmptyDesk} alt="Empty state" className="w-58 h-58 mx-auto" />
        </div>

        {/* 👉 Main Message */}
        <p className="text-lg text-gray-700 mb-4 font-bold">
          Seems like there are no commits or repositories to analyze yet
        </p>

        {/* 👉 Help Text */}
        <div className="text-sm text-gray-600">
          <Link to="/organizations/gh/temba759/dashboard/add" className="text-blue-600 hover:underline">
            Add
          </Link>{" "}
          or{" "}
          <Link to="/organizations/gh/temba759/repositories" className="text-blue-600 hover:underline">
            follow
          </Link>{" "}
          your GitHub repositories to get your first analysis. Make sure you have permissions to the repositories you want to add or follow.
          <br />
          <a
            href="https://docs.codacy.com/organizations/organization-overview"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 hover:underline mt-2"
          >
            Learn more about it here
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round">
              <path d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48M336 64h112v112M224 288L440 72" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
