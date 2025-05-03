import React, { useEffect, useState } from 'react';
import axios from 'axios';

function General() {
  const [darkMode, setDarkMode] = useState(false);

  // 🌓 Load dark mode preference from localStorage
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  // 🌓 Toggle dark mode
  const handleToggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newMode);
  };

  // 🗑️ Handle account deletion
  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
  
    try {
      const token = localStorage.getItem('token'); // Or whatever key you use
  
      if (!token) {
        alert("Authentication token not found.");
        return;
      }
  
      await axios.delete(`http://localhost:3000/github/delete-account`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      alert("Account deleted successfully.");
      localStorage.removeItem('token'); // optional: logout cleanup
      window.location.href = '/'; // redirect to homepage or login
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account.");
    }
  };
  

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* Preferences */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Preferences</h2>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4 border dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-gray-800 dark:text-white">Dark Mode</span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={handleToggleDarkMode}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 relative peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-800 dark:text-white">Email Notifications</span>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 relative peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-red-600">Danger Zone</h2>
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 p-6 rounded-lg shadow-md">
          <p className="mb-4 text-red-700 dark:text-red-200">
            Deleting your account will remove all data permanently.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Delete My Account
          </button>
        </div>
      </section>
    </div>
  );
}

export default General;
