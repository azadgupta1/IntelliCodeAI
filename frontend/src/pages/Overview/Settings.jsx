import React, { useState } from 'react';
import General from '../../components/Settings/General';
import PlanBillings from '../../components/Settings/PlanBillings';
import Profile from '../Profile';

function Settings() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { key: 'general', label: 'General' },
    { key: 'billing', label: 'Plan & Billing' },
    { key: 'profile', label: 'Profile' },
  ];

  return (
    <div className="w-screen h-screen bg-gray-50 flex flex-col">
      
      {/* Tabs */}
      <div className="flex border-b bg-white overflow-x-auto mt-5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-3 font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === tab.key
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-blue-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 bg-gray-50 overflow-auto">
        <div className="w-full h-full bg-white">
          {activeTab === 'general' && <General />}
          {activeTab === 'billing' && <PlanBillings />}
          {activeTab === 'profile' && <Profile />}
        </div>
      </div>
    </div>
  );
}

export default Settings;
