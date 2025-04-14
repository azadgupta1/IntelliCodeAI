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

  const menu = [
    { label: "Overview", path: "overview", icon: <FaTachometerAlt size={20} /> },
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-16 sm:w-20 bg-white border-r shadow-sm flex flex-col items-center py-6 space-y-6">
        <button
          onClick={() => navigate(-1)}
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

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="mb-4 text-xl font-semibold text-gray-700">
          {owner} / {repo}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default RepositoryLayout;
