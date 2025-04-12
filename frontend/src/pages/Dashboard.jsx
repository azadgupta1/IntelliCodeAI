import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { FaHome, FaFolderOpen, FaShieldAlt, FaLock, FaCog } from "react-icons/fa";

const Dashboard = () => {
    const linkClasses = ({ isActive }) =>
        `p-4 hover:bg-gray-200 rounded-lg transition-all flex justify-center text-gray-800 ${
          isActive ? "bg-gray-200" : ""
        }`;
      

  return (
    <div className="flex min-h-screen bg-gray">
      {/* Sidebar */}
      <div className="w-16 sm:w-20 bg-white border-r shadow-sm flex flex-col items-center py-6 space-y-6">
        <NavLink to="" end className={linkClasses}>
          <FaHome size={20}  />
        </NavLink>
        <NavLink to="repositories" className={linkClasses}>
          <FaFolderOpen size={20} />
        </NavLink>
        <NavLink to="policies" className={linkClasses}>
          <FaShieldAlt size={20} />
        </NavLink>
        <NavLink to="security" className={linkClasses}>
          <FaLock size={20} />
        </NavLink>
        <NavLink to="settings" className={linkClasses}>
          <FaCog size={20} />
        </NavLink>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
