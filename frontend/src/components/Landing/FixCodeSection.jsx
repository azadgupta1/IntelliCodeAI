// import React from "react";
// import "../../FixCodeStyles.css";

// const FixCodeSection = () => {
//   return (
//     <section className="relative min-h-[60vh] w-full bg-gradient-to-br from-[#080D27] via-[#0E1337] to-[#0F1A45] text-white overflow-hidden px-6 py-24 flex flex-col items-center justify-center text-center">
//       {/* Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#080D27] via-[#0E1337] to-[#0F1A45] z-0 animate-gradientLoop" />
//       <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-10 z-0" />

//       {/* Headline with hanging “Breaks” */}
//       <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold relative z-10 flex flex-wrap justify-center items-center gap-2 sm:gap-3">
//         <span>Code</span>
//         <span className="relative hanging-word whitespace-nowrap">Breaks</span>
//         <span>,</span>
//         <span> We Fix</span>
//       </h2>

//       {/* Subtitle */}
//       <p className="text-base sm:text-lg md:text-xl text-gray-300 relative z-10 max-w-xl sm:max-w-2xl mt-4 sm:mt-6 px-2 sm:px-0">
//         IntelliCodeAI uses AI to analyze your code after every GitHub commit, detecting bugs, offering actionable suggestions, and optimizing your codebase—helping your team deliver high-quality software faster and with confidence.
//       </p>

//       {/* Floating Glass Card */}
//       <div className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-6 sm:p-8 w-full max-w-md sm:max-w-3xl shadow-xl mt-8 sm:mt-10">
//         <pre className="text-left text-xs sm:text-sm md:text-base text-green-400 font-mono whitespace-pre-wrap leading-relaxed">
// {`> AI: Analyzing your repository...
// > 🚨 Detected 3 issues in utils/
// > 🛠️ Auto-patching...
// ✔ All fixed. You're ready to ship.`}
//         </pre>
//       </div>
//     </section>
//   );
// };

// export default FixCodeSection;








// import React from "react";
// import IntelliCodeAI_06 from "../../assets/IntelliCodeAI_06.png";

// const FixCodeSection = () => {
//   return (
//     <section className="relative w-full bg-[#0B1023] text-white overflow-hidden px-6 py-28">
//       <div className="absolute inset-0 bg-gradient-to-b from-[#0B1023] via-[#0E1337] to-[#0B1023]" />

//       <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
//         <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
//           When code breaks,
//           <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
//             IntelliCodeAI fixes it
//           </span>
//         </h2>

//         <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-3xl leading-relaxed">
//           IntelliCodeAI automatically reviews every GitHub commit using advanced AI.
//           It detects bugs, suggests improvements, and helps teams ship cleaner,
//           more reliable code—without slowing development.
//         </p>

//         <div className="mt-12 w-full max-w-4xl rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden">
//           <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
//             <span className="w-3 h-3 rounded-full bg-red-500" />
//             <span className="w-3 h-3 rounded-full bg-yellow-500" />
//             <span className="w-3 h-3 rounded-full bg-green-500" />
//             <span className="ml-3 text-xs text-gray-400 font-medium">
//               IntelliCodeAI — Automated Code Review
//             </span>
//           </div>

//           <pre className="p-6 text-left text-sm sm:text-base font-mono text-emerald-400 leading-relaxed">
// {`✔ Connected to GitHub repository
// ✔ Analyzing latest commit...

// ⚠️ 3 potential issues detected
// • Unhandled promise rejection (utils/api.ts)
// • Inefficient loop detected (services/cache.ts)
// • Missing input validation (auth/controller.ts)

// ✔ Suggested fixes applied
// ✔ Code quality improved

// Ready to merge.`}
//           </pre>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FixCodeSection;





















import React from "react";
import IntelliCodeAI_06 from "../../assets/IntelliCodeAI_06.png";

const FixCodeSection = () => {
  return (
    <section className="relative w-full bg-[#0B1023] text-white overflow-hidden px-6 py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1023] via-[#0E1337] to-[#0B1023]" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
          When code breaks,
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            IntelliCodeAI fixes it
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-3xl leading-relaxed">
          IntelliCodeAI automatically reviews every GitHub commit using advanced AI.
          It detects bugs, suggests improvements, and helps teams ship cleaner,
          more reliable code—without slowing development.
        </p>

        {/* Analysis Image Card */}
        <div className="mt-12 w-full max-w-5xl rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Card Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-3 text-xs text-gray-400 font-medium">
              IntelliCodeAI — AI Code Analysis
            </span>
          </div>

          {/* Image */}
          <div className="">
            <img
              src={IntelliCodeAI_06}
              alt="IntelliCodeAI analysis dashboard"
              className="w-full rounded-lg border border-white/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FixCodeSection;
