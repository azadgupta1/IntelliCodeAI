// import React from "react";
// import { Outlet, NavLink, useParams, useNavigate } from "react-router-dom";
// import {
//   FaTachometerAlt,
//   FaCodeBranch,
//   FaFileAlt,
//   FaExclamationCircle,
//   FaCode,
//   FaCog,
//   FaArrowLeft,
// } from "react-icons/fa";

// const RepositoryLayout = () => {
//   const { owner, repo } = useParams();
//   const navigate = useNavigate();

//   const menu = [
//     { label: "RepoOverview", path: "repooverview", icon: <FaTachometerAlt size={20} /> },
//     { label: "Commits", path: "commits", icon: <FaCodeBranch size={20} /> },
//     { label: "Files", path: "files", icon: <FaFileAlt size={20} /> },
//     { label: "Issues", path: "issues", icon: <FaExclamationCircle size={20} /> },
//     { label: "Pull Requests", path: "pulls", icon: <FaCode size={20} /> },
//     { label: "Settings", path: "settings", icon: <FaCog size={20} /> },
//   ];

//   const linkClasses = ({ isActive }) =>
//     `p-4 rounded-lg transition-all flex justify-center text-gray-800 hover:bg-gray-200 ${
//       isActive ? "bg-gray-200" : ""
//     }`;

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-16 sm:w-20 bg-white border-r shadow-sm flex flex-col items-center py-6 space-y-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="text-gray-600 hover:text-gray-900 cursor-pointer transition-all"
//           title="Back"
//         >
//           <FaArrowLeft size={20} />
//         </button>
//         {menu.map((item) => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             className={linkClasses}
//             title={item.label}
//             end
//           >
//             {item.icon}
//           </NavLink>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6 overflow-y-auto">
//         <div className="mb-4 text-xl font-semibold text-gray-700">
//           {owner} / {repo}
//         </div>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default RepositoryLayout;



// import React from "react";
// import { Outlet, NavLink, useParams, useNavigate } from "react-router-dom";
// import {
//   FaTachometerAlt,
//   FaCodeBranch,
//   FaFileAlt,
//   FaExclamationCircle,
//   FaCode,
//   FaCog,
//   FaArrowLeft,
// } from "react-icons/fa";

// const RepositoryLayout = () => {
//   const { owner, repo } = useParams();
//   const navigate = useNavigate();

//   const menu = [
//     { label: "RepoOverview", path: "repooverview", icon: <FaTachometerAlt size={20} /> },
//     { label: "Commits", path: "commits", icon: <FaCodeBranch size={20} /> },
//     { label: "Files", path: "files", icon: <FaFileAlt size={20} /> },
//     { label: "Issues", path: "issues", icon: <FaExclamationCircle size={20} /> },
//     { label: "Pull Requests", path: "pulls", icon: <FaCode size={20} /> },
//     { label: "Settings", path: "settings", icon: <FaCog size={20} /> },
//   ];

//   const linkClasses = ({ isActive }) =>
//     `p-4 rounded-lg transition-all flex justify-center text-gray-800 hover:bg-gray-200 ${
//       isActive ? "bg-gray-200" : ""
//     }`;

//   return (
//     <div className="flex bg-gray-50 min-h-screen">
//       {/* Fixed Sidebar */}
//       <div className="fixed h-screen w-16 sm:w-22 bg-white border-r shadow-sm flex flex-col items-center py-6 space-y-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="text-gray-600 hover:text-gray-900 cursor-pointer transition-all"
//           title="Back"
//         >
//           <FaArrowLeft size={20} />
//         </button>
//         {menu.map((item) => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             className={linkClasses}
//             title={item.label}
//             end
//           >
//             {item.icon}
//           </NavLink>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 ml-16 sm:ml-20 p-0 overflow-y-auto">
//         {/* <div className="bg-white shadow-md rounded-md mb-4 p-6">
//         <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
//           {owner} / {repo}
//         </h1>
//       </div> */}

//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default RepositoryLayout;











import React from "react";
import { Outlet, NavLink, useParams, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCodeBranch,
  FaFileAlt,
  FaExclamationCircle,
  FaCode,
  FaCog,
  FaArrowLeft,
} from "react-icons/fa";

const RepositoryLayout = () => {
  const { owner, repo } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_FRONTEND_URL;

  const menu = [
    { label: "RepoOverview", path: "repooverview", icon: <FaTachometerAlt size={20} /> },
    { label: "Commits", path: "commits", icon: <FaCodeBranch size={20} /> },
    { label: "Files", path: "files", icon: <FaFileAlt size={20} /> },
    { label: "Issues", path: "issues", icon: <FaExclamationCircle size={20} /> },
    { label: "Pull Requests", path: "pulls", icon: <FaCode size={20} /> },
    { label: "Settings", path: "settings", icon: <FaCog size={20} /> },
  ];

  const linkClasses = ({ isActive }) =>
    `p-4 rounded-lg transition-all flex justify-center text-gray-800 hover:bg-gray-200 ${
      isActive ? "bg-gray-200" : ""
    }`;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      
      {/* ===== Desktop Sidebar (UNCHANGED) ===== */}
      <div className="fixed h-screen w-16 sm:w-22 bg-white border-r shadow-sm flex flex-col items-center py-6 space-y-6 sm:flex">
        <button
          onClick={() => navigate(`/dashboard/${owner}`)}
          className="text-gray-600 hover:text-gray-900 cursor-pointer transition-all"
          title="Back"
        >
          <FaArrowLeft size={20} />
        </button>

        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={linkClasses}
            title={item.label}
            end
          >
            {item.icon}
          </NavLink>
        ))}
      </div>

      {/* ===== Main Content ===== */}
      <div className="flex-1 ml-0 sm:ml-16 p-0 overflow-y-auto pb-16 sm:pb-0">
        <Outlet />
      </div>

      {/* ===== Mobile Bottom Navigation (NEW) ===== */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2 sm:hidden z-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center text-gray-600"
        >
          <FaArrowLeft size={18} />
        </button>

        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-center p-2 ${
                isActive ? "text-blue-600" : "text-gray-600"
              }`
            }
            end
          >
            {item.icon}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default RepositoryLayout;
