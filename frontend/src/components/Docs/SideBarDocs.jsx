import React from 'react';
import IntelliCodeAI_3 from "../../assets/IntelliCodeAI_3.png";

function SideBarDocs() {
  return (
    <div className="fixed top-0 left-0 h-screen w-74 bg-gray-800 p-4 flex flex-col items-start">
      
      {/* Logo and Name at the top */}
      <div className="flex items-center gap-2 mb-3">
        <img
          src={IntelliCodeAI_3}
          alt="Logo"
          className="h-8 sm:h-10 md:h-12 w-auto"
        />
        <span className="text-1xl sm:text-1xl md:text-2xl font-bold font-orbitron text-white">
          IntelliCodeAI
        </span>
      </div>

      {/* Docs label below */}
      <div>
        <span className="text-blue-500 text-xl font-semibold">Documentation</span>
      </div>

    </div>
  );
}

export default SideBarDocs;
