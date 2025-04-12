import React from "react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-10 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 border-b pb-3">⚙️ Account Settings</h1>

        {/* Profile Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4 border">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
              Save Changes
            </button>
          </div>
        </section>

        {/* GitHub Settings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">GitHub Integration</h2>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md border">
            <p className="mb-4">You're currently connected to GitHub.</p>
            <button className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition">
              Disconnect GitHub
            </button>
          </div>
        </section>

        {/* Preferences */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Preferences</h2>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4 border">
            <div className="flex items-center justify-between">
              <span>Dark Mode</span>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 relative peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
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
          <div className="bg-red-50 border border-red-200 p-6 rounded-lg shadow-md">
            <p className="mb-4 text-red-700">Deleting your account will remove all data permanently.</p>
            <button className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition">
              Delete My Account
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
