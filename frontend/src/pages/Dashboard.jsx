// import React from "react";
// import { Outlet, NavLink, useParams } from "react-router-dom";
// import { FaHome, FaFolderOpen, FaShieldAlt, FaLock, FaCog } from "react-icons/fa";



// const Dashboard = () => {
//   const { username } = useParams(); 
  
  

//   const linkClasses = ({ isActive }) =>
//     `p-4 hover:bg-gray-200 rounded-lg transition-all flex justify-center text-gray-800 ${
//       isActive ? "bg-gray-200" : ""
//     }`;

//   return (
//     <div className="flex min-h-screen sm:h-screen bg-gray">
//       {/* Sidebar */}
//       <div className="h-screen w-24 sm:w-15 md:w-20 lg:w-22 bg-white border-r shadow-sm flex flex-col items-center py-6 space-y-6 fixed">
//         <NavLink to={`/dashboard/${username}`} end className={linkClasses}>
//           <FaHome size={20} />
//         </NavLink>
//         <NavLink to={`/dashboard/${username}/repositories`} className={linkClasses}>
//           <FaFolderOpen size={20} />
//         </NavLink>
//         <NavLink to={`/dashboard/${username}/policies`} className={linkClasses}>
//           <FaShieldAlt size={20} />
//         </NavLink>
//         <NavLink to={`/dashboard/${username}/security`} className={linkClasses}>
//           <FaLock size={20} />
//         </NavLink>
//         <NavLink to={`/dashboard/${username}/settings`} className={linkClasses}>
//           <FaCog size={20} />
//         </NavLink>
//       </div>

//       {/* Main Content */}
//       <div className="flex min-h-screen bg-gray ml-16 sm:ml-20">
//         <div className="flex-1 p-0">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;






import React from "react";
import { Outlet, NavLink, useParams } from "react-router-dom";
import {
  FaHome,
  FaFolderOpen,
  FaShieldAlt,
  FaLock,
  FaCog,
} from "react-icons/fa";

const Dashboard = () => {
  const { username } = useParams();

  const linkClasses = ({ isActive }) =>
    `flex items-center justify-center p-3 rounded-lg transition-all ${
      isActive
        ? "bg-gray-200 text-gray-900"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Sidebar (Desktop / Tablet) */}
      <aside className="hidden sm:flex fixed left-0 top-0 h-screen w-16 md:w-20 bg-white border-r shadow-sm flex-col items-center py-6 space-y-6 z-10">
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-0 sm:ml-16 md:ml-20 pb-16 sm:pb-0">
        <Outlet />
      </main>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 right-0 sm:hidden bg-white border-t shadow-md flex justify-around py-2 z-20">
        <NavLink to={`/dashboard/${username}`} end className={linkClasses}>
          <FaHome size={18} />
        </NavLink>
        <NavLink to={`/dashboard/${username}/repositories`} className={linkClasses}>
          <FaFolderOpen size={18} />
        </NavLink>
        <NavLink to={`/dashboard/${username}/policies`} className={linkClasses}>
          <FaShieldAlt size={18} />
        </NavLink>
        <NavLink to={`/dashboard/${username}/security`} className={linkClasses}>
          <FaLock size={18} />
        </NavLink>
        <NavLink to={`/dashboard/${username}/settings`} className={linkClasses}>
          <FaCog size={18} />
        </NavLink>
      </nav>
    </div>
  );
};

export default Dashboard;




