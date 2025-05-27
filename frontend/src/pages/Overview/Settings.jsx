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
