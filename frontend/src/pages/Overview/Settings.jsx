// import React from "react";

// const Settings = () => {
//   return (
//     <div className="min-h-screen bg-white px-6 py-10 text-gray-800">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8 border-b pb-3">⚙️ Account Settings</h1>

//         {/* Profile Section */}
//         <section className="mb-10">
//           <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
//           <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4 border">
//             <div>
//               <label className="block text-sm font-medium mb-1">Full Name</label>
//               <input
//                 type="text"
//                 placeholder="Your name"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Email Address</label>
//               <input
//                 type="email"
//                 placeholder="you@example.com"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
//               Save Changes
//             </button>
//           </div>
//         </section>

//         {/* GitHub Settings */}
//         <section className="mb-10">
//           <h2 className="text-xl font-semibold mb-4">GitHub Integration</h2>
//           <div className="bg-gray-50 p-6 rounded-lg shadow-md border">
//             <p className="mb-4">You're currently connected to GitHub.</p>
//             <button className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition">
//               Disconnect GitHub
//             </button>
//           </div>
//         </section>

//         {/* Preferences */}
//         <section className="mb-10">
//           <h2 className="text-xl font-semibold mb-4">Preferences</h2>
//           <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4 border">
//             <div className="flex items-center justify-between">
//               <span>Dark Mode</span>
//               <label className="inline-flex items-center cursor-pointer">
//                 <input type="checkbox" value="" className="sr-only peer" />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 relative peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
//               </label>
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Email Notifications</span>
//               <label className="inline-flex items-center cursor-pointer">
//                 <input type="checkbox" className="sr-only peer" defaultChecked />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 relative peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
//               </label>
//             </div>
//           </div>
//         </section>

//         {/* Danger Zone */}
//         <section>
//           <h2 className="text-xl font-semibold mb-4 text-red-600">Danger Zone</h2>
//           <div className="bg-red-50 border border-red-200 p-6 rounded-lg shadow-md">
//             <p className="mb-4 text-red-700">Deleting your account will remove all data permanently.</p>
//             <button className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition">
//               Delete My Account
//             </button>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Settings;




// import React, { useState } from 'react'
// import General from '../components/Settings/General'
// import PlanBillings from '../components/Settings/PlanBillings'
// import Profile from './Profile'

// function Settings() {
//   const [activeTab, setActiveTab] = useState('general') // ✅ JS-friendly

//   return (
//     <div className="w-screen mt-6"> {/* ✅ Valid Tailwind padding class */}
//       {/* Tab Buttons */}
//       <div className="w-full flex border-b mb-4 ml-5 space-x-10">
//         <button
//           className={` pb-2 border-b-2 transition ${
//             activeTab === 'general' ? 'border-blue-500 text-blue-600 font-semibold' : 'border-transparent'
//           }`}
//           onClick={() => setActiveTab('general')}
//         >
//           General
//         </button>

//         <button
//           className={`pb-2 border-b-2 transition ${
//             activeTab === 'billing' ? 'border-blue-500 text-blue-600 font-semibold' : 'border-transparent'
//           }`}
//           onClick={() => setActiveTab('billing')}
//         >
//           Plan & Billing
//         </button>

//         <button
//           className={`pb-2 border-b-2 transition ${
//             activeTab === 'profile' ? 'border-blue-500 text-blue-600 font-semibold' : 'border-transparent'
//           }`}
//           onClick={() => setActiveTab('profile')}
//         >
//           Profile
//         </button>
//       </div>

//       {/* Tab Content */}
//       <div className="mt-4">
//         {activeTab === 'general' && <General />}
//         {activeTab === 'billing' && <PlanBillings />}
//         {activeTab === 'profile' && <Profile />}
//       </div>
//     </div>
//   )
// }

// export default Settings


import React, { useState } from 'react';
import General from '../../components/Settings/General';
import PlanBillings from '../../components/Settings/PlanBillings';
import Profile from '../Profile';

function Settings() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { key: 'general', label: 'General Settings' },
    { key: 'billing', label: 'Plan & Billing' },
    { key: 'profile', label: 'Profile Information' },
  ];

  return (
    <div className="w-full min-h-screen flex bg-gray-50 p-6">
      {/* Sidebar */}
      <div className="w-1/4 pr-6 border-r border-gray-200">
        <h2 className="text-xl font-bold text-gray-700 mb-6">Settings</h2>
        <nav className="flex flex-col space-y-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-blue-100 text-blue-700 font-semibold shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="w-3/4 pl-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          {activeTab === 'general' && <General />}
          {activeTab === 'billing' && <PlanBillings />}
          {activeTab === 'profile' && <Profile />}
        </div>
      </div>
    </div>
  );
}

export default Settings;
