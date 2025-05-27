// import React from "react";
// import "../../FixCodeStyles.css";

// const FixCodeSection = () => {
//   return (
//     <section className="relative min-h-[60vh] w-full bg-black text-white overflow-hidden px-6 py-24 flex flex-col items-center justify-center text-center">
//       {/* Background */}
//       <div className="absolute inset-0 bg-gradient-to-tr from-[#1e1b4b] via-[#0f172a] to-[#0f766e] z-0 animate-gradientLoop" />
//       <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-10 z-0" />

//       {/* Headline with hanging “Breaks” */}
//       <h2 className="text-4xl md:text-6xl font-bold relative z-10 flex items-center gap-3">
//         <span>Code</span>
//         <span className="relative hanging-word">Breaks</span>

//         <span>, We Fix</span>
//       </h2>

//       {/* Subtitle */}
//       <p className="text-lg md:text-xl text-gray-300 relative z-10 max-w-2xl mt-6">
//         Don't worry. IntelliCodeAI catches bugs before they cause chaos — and fixes them instantly.
//       </p>

//       {/* Floating Glass Card */}
//       <div className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-8 w-full max-w-3xl shadow-xl mt-10">
//         <pre className="text-left text-sm sm:text-base text-green-400 font-mono whitespace-pre-wrap leading-relaxed">
// {`> AI: Analyzing your repo...
// > 🚨 Detected 3 issues in utils/
// > 🛠️ Auto-patching...
// ✔ All fixed. You're good to ship.`}
//         </pre>
//       </div>
//     </section>
//   );
// };

// export default FixCodeSection;


import React from "react";
import "../../FixCodeStyles.css";

const FixCodeSection = () => {
  return (
    <section className="relative min-h-[60vh] w-full bg-black text-white overflow-hidden px-6 py-24 flex flex-col items-center justify-center text-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#1e1b4b] via-[#0f172a] to-[#0f766e] z-0 animate-gradientLoop" />
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-10 z-0" />

      {/* Headline with hanging “Breaks” */}
      <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold relative z-10 flex flex-wrap justify-center items-center gap-2 sm:gap-3">
        <span>Code</span>
        <span className="relative hanging-word whitespace-nowrap">Breaks</span>
        <span>, We Fix</span>
      </h2>

      {/* Subtitle */}
      <p className="text-base sm:text-lg md:text-xl text-gray-300 relative z-10 max-w-xl sm:max-w-2xl mt-4 sm:mt-6 px-2 sm:px-0">
        IntelliCodeAI uses AI to analyze your code after every GitHub commit, detecting bugs, offering actionable suggestions, and optimizing your codebase—helping your team deliver high-quality software faster and with confidence.
      </p>

      {/* Floating Glass Card */}
      <div className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-6 sm:p-8 w-full max-w-md sm:max-w-3xl shadow-xl mt-8 sm:mt-10">
        <pre className="text-left text-xs sm:text-sm md:text-base text-green-400 font-mono whitespace-pre-wrap leading-relaxed">
{`> AI: Analyzing your repository...
> 🚨 Detected 3 issues in utils/
> 🛠️ Auto-patching...
✔ All fixed. You're ready to ship.`}
        </pre>
      </div>
    </section>
  );
};

export default FixCodeSection;
