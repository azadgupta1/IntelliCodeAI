// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {API_BASE_URL} from "../../services/githubServices";

// function General() {
//   const [darkMode, setDarkMode] = useState(false);

//   // 🌓 Load dark mode preference from localStorage
//   useEffect(() => {
//     const isDark = localStorage.getItem('theme') === 'dark';
//     setDarkMode(isDark);
//     document.documentElement.classList.toggle('dark', isDark);
//   }, []);

//   // 🌓 Toggle dark mode
//   const handleToggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem('theme', newMode ? 'dark' : 'light');
//     document.documentElement.classList.toggle('dark', newMode);
//   };

//   // 🗑️ Handle account deletion
//   const handleDeleteAccount = async () => {
//     if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
  
//     try {
//       const token = localStorage.getItem('token'); // Or whatever key you use
  
//       if (!token) {
//         alert("Authentication token not found.");
//         return;
//       }
  
//       await axios.delete(`${API_BASE_URL}/github/delete-account`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       alert("Account deleted successfully.");
//       localStorage.removeItem('token'); // optional: logout cleanup
//       window.location.href = '/'; // redirect to homepage or login
//     } catch (error) {
//       console.error("Error deleting account:", error);
//       alert("Failed to delete account.");
//     }
//   };
  

//   return (
//     <div className="w-full max-w-md mx-auto p-4">
//       {/* Preferences */}
//       <section className="mb-10">
//         <h2 className="text-xl font-semibold mb-4">Preferences</h2>
//         <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4 border dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <span className="text-gray-800 dark:text-white">Dark Mode</span>
//             <label className="inline-flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 className="sr-only peer"
//                 checked={darkMode}
//                 onChange={handleToggleDarkMode}
//               />
//               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 relative peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
//             </label>
//           </div>

//           <div className="flex items-center justify-between">
//             <span className="text-gray-800 dark:text-white">Email Notifications</span>
//             <label className="inline-flex items-center cursor-pointer">
//               <input type="checkbox" className="sr-only peer" defaultChecked />
//               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 relative peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
//             </label>
//           </div>
//         </div>
//       </section>

//       {/* Danger Zone */}
//       <section>
//         <h2 className="text-xl font-semibold mb-4 text-red-600">Danger Zone</h2>
//         <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 p-6 rounded-lg shadow-md">
//           <p className="mb-4 text-red-700 dark:text-red-200">
//             Deleting your account will remove all data permanently.
//           </p>
//           <button
//             onClick={handleDeleteAccount}
//             className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
//           >
//             Delete My Account
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default General;






























import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../services/githubServices";

function General() {
  const [darkMode, setDarkMode] = useState(false);

  // Load theme preference (display-only for now)
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDarkMode(isDark);
  }, []);

  const handleDeleteAccount = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    )
      return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token not found.");
        return;
      }

      await axios.delete(`${API_BASE_URL}/github/delete-account`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Account deleted successfully.");
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-10 space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            General Settings
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your preferences and account settings.
          </p>
        </div>

        {/* Preferences */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-lg font-medium text-slate-900">
              Preferences
            </h2>
          </div>

          <div className="divide-y divide-slate-200">
            {/* Dark Mode */}
            <div className="flex items-center justify-between px-6 py-4 opacity-60 cursor-not-allowed">
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Dark Mode
                </p>
                <p className="text-xs text-slate-500">
                  Switch between light and dark themes
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
                <div className="w-11 h-6 bg-slate-300 rounded-full relative">
                  <div
                    className={`absolute top-[2px] h-5 w-5 rounded-full bg-white shadow transition ${
                      darkMode ? "right-[2px]" : "left-[2px]"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Email Notifications */}
            <div className="flex items-center justify-between px-6 py-4 opacity-60 cursor-not-allowed">
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Email Notifications
                </p>
                <p className="text-xs text-slate-500">
                  Receive updates about analyses and reports
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
                <div className="w-11 h-6 bg-slate-300 rounded-full relative">
                  <div className="absolute top-[2px] left-[2px] h-5 w-5 rounded-full bg-white shadow" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="rounded-2xl border border-red-200 bg-red-50 shadow-sm">
          <div className="px-6 py-5 border-b border-red-200">
            <h2 className="text-lg font-medium text-red-700">
              Danger Zone
            </h2>
          </div>

          <div className="px-6 py-6">
            <p className="text-sm text-red-600 mb-4">
              Deleting your account will permanently remove all repositories,
              analyses, and associated data. This action cannot be undone.
            </p>
            <button
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
            >
              Delete Account
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default General;
