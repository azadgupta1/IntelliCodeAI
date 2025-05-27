// import React from "react";
// import { ArrowRight } from "lucide-react";

// const HeroSection = () => {
//   return (
//     <section className="relative h-screen bg-gradient-to-br from-[#6c63ff] via-[#9384e6] to-[#00ffd1] flex items-center justify-center px-4 overflow-hidden">
//       {/* Glass overlay */}
//       <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-0" />

//       {/* Glowing blobs */}
//       <div className="absolute w-72 h-72 bg-purple-400 opacity-20 rounded-full top-10 left-10 blur-3xl animate-pulse z-0" />
//       <div className="absolute w-72 h-72 bg-cyan-400 opacity-20 rounded-full bottom-10 right-10 blur-3xl animate-pulse z-0" />

//       {/* SVG Grid Overlay */}
//       <svg className="absolute inset-0 w-full h-full z-0" xmlns="http://www.w3.org/2000/svg">
//         <defs>
//           <pattern
//             id="grid"
//             width="40"
//             height="40"
//             patternUnits="userSpaceOnUse"
//           >
//             <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.1" />
//           </pattern>
//         </defs>
//         <rect width="100%" height="100%" fill="url(#grid)" />
//       </svg>

//       {/* Main Content */}
//       <div className="relative z-10 max-w-4xl mx-auto text-center text-white px-4">
//         <h1
//           className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow"
//           style={{ fontFamily: "'Orbitron', sans-serif" }}
//         >
//           Supercharge Your Code with{" "}
//           <span className="text-[#00ffd1]">IntelliCodeAI</span>
//         </h1>

//         <p className="mt-6 text-lg sm:text-xl text-gray-200 max-w-xl mx-auto">
//           Analyze, improve, and commit code effortlessly. Let AI help you ship faster and smarter — from GitHub to production.
//         </p>

//         <button className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition duration-300 shadow-lg">
//           Get Started Now
//           <ArrowRight className="w-5 h-5" />
//         </button>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;



// import React from "react";
// import { ArrowRight } from "lucide-react";

// const HeroSection = () => {
//   return (
//     <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4 bg-black text-white">
//       {/* Animated Background Gradient and Stars */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#0f766e] animate-gradientLoop z-0" />
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <div className="w-full h-full bg-[url('/stars.svg')] opacity-20 animate-pulse" />
//       </div>

//       {/* Floating Blobs */}
//       <div className="absolute w-96 h-96 bg-[#00ffd1] opacity-10 rounded-full top-[-50px] left-[-50px] blur-3xl animate-float z-0" />
//       <div className="absolute w-80 h-80 bg-[#6c63ff] opacity-10 rounded-full bottom-[-40px] right-[-40px] blur-3xl animate-float delay-3000 z-0" />

//       {/* Main Content Card with 3D Tilt */}
//       <div
//         className="relative z-10 w-full max-w-4xl mx-auto p-10 sm:p-16 bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 text-center"
//         style={{
//           transformStyle: "preserve-3d",
//           perspective: "1000px",
//         }}
//       >
//         <h1
//           className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00ffd1] via-white to-[#6c63ff] animate-textShine"
//           style={{ fontFamily: "'Orbitron', sans-serif" }}
//         >
//           Supercharge Your Code with IntelliCodeAI
//         </h1>

//         <p className="text-lg sm:text-xl text-gray-300 max-w-xl mx-auto">
//           AI-driven code reviews, optimization, and intelligent commits — from GitHub to production, we’ve got your back.
//         </p>

//         <div className="mt-10 flex justify-center">
//           <button className="relative inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-full bg-[#00ffd1] text-black shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
//             Get Started Now
//             <ArrowRight className="w-5 h-5" />
//             <span className="absolute -inset-1 rounded-full blur-lg opacity-75 bg-gradient-to-r from-[#00ffd1] to-[#6c63ff] animate-glowPulse -z-10"></span>
//           </button>
//         </div>
//       </div>

//       {/* Subtle Grid Overlay */}
//       <svg
//         className="absolute inset-0 w-full h-full opacity-5 z-0"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <defs>
//           <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
//             <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.1" />
//           </pattern>
//         </defs>
//         <rect width="100%" height="100%" fill="url(#grid)" />
//       </svg>
//     </section>
//   );
// };

// export default HeroSection;



import React from "react";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a] via-[#1e1b4b] to-[#0f766e] z-0 animate-gradientLoop"></div>
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-10 z-0"></div>

      {/* Left Blob */}
      <div className="absolute w-[500px] h-[500px] bg-[#00ffd1] opacity-10 rounded-full blur-[180px] top-[-100px] left-[-100px] z-0"></div>
      {/* Right Blob */}
      <div className="absolute w-[400px] h-[400px] bg-[#6c63ff] opacity-10 rounded-full blur-[150px] bottom-[-80px] right-[-80px] z-0"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-start space-y-6 max-w-xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-br from-[#00ffd1] to-[#6c63ff] animate-textShine tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          Supercharge Your Code <br /> with <span className="text-white">IntelliCodeAI</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-300">
          AI-powered code reviews, optimization, and intelligent suggestions — automate your code quality from GitHub to production.
        </p>

        <div className="pt-4">
          <button className="relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-full bg-[#00ffd1] text-black shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
            Get Started Now
            <ArrowRight className="w-5 h-5" />
            <span className="absolute -inset-1 blur-lg opacity-60 bg-gradient-to-r from-[#00ffd1] to-[#6c63ff] rounded-full -z-10 animate-glowPulse"></span>
          </button>
        </div>
      </div>

      {/* Visual Accent / Mockup Illustration (optional) */}
      <div className="relative z-10 hidden md:flex items-center justify-center">
        <div className="bg-white/5 p-6 rounded-3xl shadow-xl border border-white/10 backdrop-blur-md w-[90%] h-[80%] flex flex-col justify-center items-center text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-[#00ffd1] to-[#6c63ff] rounded-full mb-6 animate-bounce-slow"></div>
          <h3 className="text-xl font-semibold text-white">Code AI. Smarter Commits.</h3>
          <p className="text-gray-400 mt-2 text-sm max-w-sm">
            IntelliCodeAI continuously learns from your repositories to enhance code suggestions & enforce best practices.
          </p>
        </div>
      </div>

      {/* Optional Decorative Grid Overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03] z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </section>
  );
};

export default HeroSection;
