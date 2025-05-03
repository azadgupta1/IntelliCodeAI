// import React from "react";
// import { Outlet, NavLink } from "react-router-dom";
// import { FaHome, FaFolderOpen, FaShieldAlt, FaLock, FaCog } from "react-icons/fa";

// const Dashboard = () => {
//     const linkClasses = ({ isActive }) =>
//         `p-4 hover:bg-gray-200 rounded-lg transition-all flex justify-center text-gray-800 ${
//           isActive ? "bg-gray-200" : ""
//         }`;
      

//   return (
//     <div className="flex min-h-screen bg-gray">
//       {/* Sidebar */}
//       {/* <div className="w-24 sm:w-20 bg-white border-r shadow-sm flex flex-col items-center py-6 space-y-6"> */}
//       <div className="h-screen w-16 sm:w-20 bg-white border-r shadow-sm flex flex-col items-center py-6 space-y-6 fixed">

//         <NavLink to="" end className={linkClasses}>
//           <FaHome size={20}  />
//         </NavLink>
//         <NavLink to="repositories" className={linkClasses}>
//           <FaFolderOpen size={20} />
//         </NavLink>
//         <NavLink to="policies" className={linkClasses}>
//           <FaShieldAlt size={20} />
//         </NavLink>
//         <NavLink to="security" className={linkClasses}>
//           <FaLock size={20} />
//         </NavLink>
//         <NavLink to="settings" className={linkClasses}>
//           <FaCog size={20} />
//         </NavLink>
//       </div>

//       {/* Main Content
//       <div className="flex-1 p-6">
//         <Outlet />
//       </div> */}
//       <div className="flex min-h-screen bg-gray ml-16 sm:ml-20">
//   {/* Main Content */}
//   <div className="flex-1 p-0">
//     <Outlet />
//   </div>
// </div>

//     </div>
//   );
// };

// export default Dashboard;


import React from "react";
import { Outlet, NavLink, useParams } from "react-router-dom";
import { FaHome, FaFolderOpen, FaShieldAlt, FaLock, FaCog } from "react-icons/fa";

const Dashboard = () => {
  const { username } = useParams(); // 👈 capture the dynamic username

  const linkClasses = ({ isActive }) =>
    `p-4 hover:bg-gray-200 rounded-lg transition-all flex justify-center text-gray-800 ${
      isActive ? "bg-gray-200" : ""
    }`;

  return (
    <div className="flex min-h-screen bg-gray">
      {/* Sidebar */}
      <div className="h-screen w-16 sm:w-20 bg-white border-r shadow-sm flex flex-col items-center py-6 space-y-6 fixed">
        <NavLink to={`/dashboard/${username}`} end className={linkClasses}>
          <FaHome size={20} />
        </NavLink>
        <NavLink to={`/dashboard/${username}/repositories`} className={linkClasses}>
          <FaFolderOpen size={20} />
        </NavLink>
        <NavLink to={`/dashboard/${username}/policies`} className={linkClasses}>
          <FaShieldAlt size={20} />
        </NavLink>
        <NavLink to={`/dashboard/${username}/security`} className={linkClasses}>
          <FaLock size={20} />
        </NavLink>
        <NavLink to={`/dashboard/${username}/settings`} className={linkClasses}>
          <FaCog size={20} />
        </NavLink>
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen bg-gray ml-16 sm:ml-20">
        <div className="flex-1 p-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

