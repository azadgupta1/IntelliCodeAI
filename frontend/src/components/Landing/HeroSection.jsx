import React from 'react';

const HeroSection = () => {
  return (
    <section className="h-screen bg-black flex flex-col justify-center items-center text-white px-4">
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
      <button className="mt-8 px-6 py-3 bg-[#00ffd1] text-black font-semibold rounded hover:bg-[#00e6b8] transition-colors duration-200">
        Get Started
      </button>
    </section>
  );
};

export default HeroSection;





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
