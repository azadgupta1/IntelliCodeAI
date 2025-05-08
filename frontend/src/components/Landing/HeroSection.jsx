import React from 'react';

const HeroSection = () => {
  return (
    <section className="h-screen bg-[#9384e6] flex flex-col justify-center items-center text-white px-4">
      {/* Optional logo/image */}
      {/* <img src="/path-to-your-logo.png" alt="Logo" className="w-32 mb-6" /> */}

      <h1
        className="text-4xl md:text-6xl font-extrabold text-center"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        Welcome to <span className="text-[#00ffd1]">IntelliCodeAI</span>
      </h1>
      <p className="mt-4 text-lg md:text-xl text-center text-gray-400 max-w-2xl">
        Building the future with AI-powered solutions. Explore cutting-edge innovation.
      </p>

      {/* Optional CTA button */}
      <button className="mt-8 px-6 py-3 bg-[black] text-white font-semibold rounded hover:bg-[black] transition-colors duration-200">
        Get Started
      </button>
    </section>
  );
};

export default HeroSection;

// import React from "react";

// const HeroSection = () => {
//   return (
//     <section className="relative min-h-screen bg-gray-950 flex items-center justify-center overflow-hidden text-white">
//       <div className="absolute w-full h-full perspective-3d">
//         {/* Dev Branch */}
//         <div className="absolute left-10 top-1/2 transform -translate-y-1/2 z-10">
//           <div className="bg-blue-600 p-4 rounded-xl shadow-lg transform rotate-y-[-20deg]">
//             <h2 className="text-lg font-semibold">dev branch</h2>
//             <div className="mt-2 text-sm text-blue-200">commits & code...</div>
//           </div>
//           {/* Flow line to IntelliCodeAI */}
//           <div className="w-48 h-2 bg-gradient-to-r from-blue-600 to-purple-600 mt-4 rounded-full animate-flow-left"></div>
//         </div>

//         {/* IntelliCodeAI center */}
//         <div className="relative z-20 flex flex-col items-center justify-center transform scale-110">
//           <div className="bg-gradient-to-br from-purple-700 via-indigo-800 to-purple-900 p-8 rounded-3xl shadow-2xl border border-white/10 text-center transform rotate-y-0">
//             <h1 className="text-3xl font-bold">IntelliCode<span className="text-pink-400">AI</span></h1>
//             <p className="mt-2 text-sm text-purple-200">Analyzing & reviewing code...</p>
//           </div>
//         </div>

//         {/* Flow to main branch */}
//         <div className="absolute right-10 top-1/2 transform -translate-y-1/2 z-10 text-right">
//           <div className="w-48 h-2 bg-gradient-to-l from-green-400 to-purple-600 mb-4 rounded-full animate-flow-right"></div>
//           <div className="bg-green-600 p-4 rounded-xl shadow-lg transform rotate-y-[20deg]">
//             <h2 className="text-lg font-semibold">main branch</h2>
//             <div className="mt-2 text-sm text-green-200">production ready 🚀</div>
//           </div>
//         </div>
//       </div>

//       {/* Optional title overlay */}
//       <div className="absolute top-10 text-center w-full z-30">
//         <h1 className="text-4xl font-bold tracking-tight">
//           Transform Your Code Flow with <span className="text-pink-500">IntelliCodeAI</span>
//         </h1>
//         <p className="mt-2 text-gray-400">Where code meets intelligence.</p>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;






// const HeroSection = () => {
//   return (
//     <section className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white text-center py-20 px-6">
//       <h1 className="text-5xl font-extrabold mb-6 text-indigo-400 drop-shadow-lg animate-fade-in">
//         🚀 AI-Powered Code Review & Analysis
//       </h1>
//       <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
//         Upload your code or connect GitHub for instant AI-driven insights & bug fixes.
//       </p>
//       <div className="flex justify-center gap-8">
//         <button className="bg-indigo-500 px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:bg-indigo-600 transition-transform transform hover:scale-105">
//           ⬆ Upload Code for Analysis
//         </button>
//         <button className="bg-blue-500 px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105">
//           🔗 Analyze GitHub
//         </button>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
