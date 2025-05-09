import React, { useState } from 'react';

const Switch = ({ label = "", initialChecked = false, onChange, disabled = false }) => {
    const [checked, setChecked] = useState(initialChecked);
  
    const handleToggle = () => {
      if (disabled) return; // prevent toggle
      setChecked(!checked);
      if (onChange) {
        onChange(!checked);
      }
    };
  
    return (
      <div className={`flex items-center space-x-3 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <label className="text-gray-700">{label}</label>
        <div
          className={`relative inline-block w-10 h-6 ${checked ? 'bg-green-300' : 'bg-gray-300'} rounded-full`}
          onClick={handleToggle}
        >
          <div
            className={`absolute w-4 h-4 top-1 left-1 bg-white rounded-full transition-transform ${
              checked ? 'transform translate-x-4' : ''
            }`}
          ></div>
        </div>
      </div>
    );
  };
  

  export default Switch