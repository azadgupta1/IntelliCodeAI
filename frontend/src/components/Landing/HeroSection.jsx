



// import React from "react";
// import { ArrowRight } from "lucide-react";

// const HeroSection = () => {
//   return (
//     <section className="relative min-h-screen bg-black text-white overflow-hidden px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//       {/* Background Layers */}
//       <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a] via-[#1e1b4b] to-[#0f766e] z-0 animate-gradientLoop"></div>
//       <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-10 z-0"></div>

//       {/* Left Blob */}
//       <div className="absolute w-[500px] h-[500px] bg-[#00ffd1] opacity-10 rounded-full blur-[180px] top-[-100px] left-[-100px] z-0"></div>
//       {/* Right Blob */}
//       <div className="absolute w-[400px] h-[400px] bg-[#6c63ff] opacity-10 rounded-full blur-[150px] bottom-[-80px] right-[-80px] z-0"></div>

//       {/* Hero Content */}
//       <div className="relative z-10 flex flex-col items-start space-y-6 max-w-xl">
//         <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-br from-[#00ffd1] to-[#6c63ff] animate-textShine tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
//           Supercharge Your Code <br /> with <span className="text-white">IntelliCodeAI</span>
//         </h1>

//         <p className="text-lg sm:text-xl text-gray-300">
//           AI-powered code reviews, optimization, and intelligent suggestions — automate your code quality from GitHub to production.
//         </p>

//         <div className="pt-4">
//           <button className="relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-full bg-[#00ffd1] text-black shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
//             Get Started Now
//             <ArrowRight className="w-5 h-5" />
//             <span className="absolute -inset-1 blur-lg opacity-60 bg-gradient-to-r from-[#00ffd1] to-[#6c63ff] rounded-full -z-10 animate-glowPulse"></span>
//           </button>
//         </div>
//       </div>

//       {/* Visual Accent / Mockup Illustration (optional) */}
//       <div className="relative z-10 hidden md:flex items-center justify-center">
//         <div className="bg-white/5 p-6 rounded-3xl shadow-xl border border-white/10 backdrop-blur-md w-[90%] h-[80%] flex flex-col justify-center items-center text-center">
//           <div className="w-24 h-24 bg-gradient-to-br from-[#00ffd1] to-[#6c63ff] rounded-full mb-6 animate-bounce-slow"></div>
//           <h3 className="text-xl font-semibold text-white">Code AI. Smarter Commits.</h3>
//           <p className="text-gray-400 mt-2 text-sm max-w-sm">
//             IntelliCodeAI continuously learns from your repositories to enhance code suggestions & enforce best practices.
//           </p>
//         </div>
//       </div>

//       {/* Optional Decorative Grid Overlay */}
//       <svg
//         className="absolute inset-0 w-full h-full opacity-[0.03] z-0"
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


// import { Element, Link as LinkScroll } from "react-scroll";
// import Button from "../../components/Button.jsx";
// import NewIA from '../../assets/NewIA.png';

// const HeroSection = () => {
//   return (
//     <section className="relative bg-[#080D27] pt-60 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32">
//       <Element name="hero">
//         <div className="mx-auto max-w-[1252px] px-16 max-xl:px-10 max-lg:px-6 max-sm:px-4">
//           <div className="relative z-[2] max-w-[512] max-lg:max-w-[388]">
//             <div className="mb-5 uppercase text-[#C8EA80] text-[12px] font-bold leading-[16px] tracking-[0.3em]">

//               Video Editing
//             </div>
//             <h1 className="mb-6 text-[84px] font-black leading-[84px] tracking-[-0.03em] text-[#EAEDFF] uppercase max-lg:mb-7 max-lg:text-[64px] font-black leading-[64px] max-md:mb-4 max-md:text-5xl max-md:leading-12">
//               Amazingly simple
//             </h1>
//             <p className="max-w-440 mb-14 text-[22px] leading-[36px] max-md:mb-10">
//               We designed XORA AI Video Editor to be an easy to use, quick to
//               learn, and surprisingly powerful.
//             </p>
//             <LinkScroll to="features" offset={-100} spy smooth>
//               <Button icon="/images/zap.svg">Try it now</Button>
//             </LinkScroll>
//           </div>

//           <div className="absolute -top-32 left-[calc(50%-340px)] w-[630px] pointer-events-none max-lg:-top-40 max-lg:left-[calc(50%-280px)] max-lg:w-[1160px] max-md:bottom-[-590px] max-md:left-[calc(50%-390px)] max-md:top-auto">
//             <img
//               src={NewIA}
//               className="w-[630px] h-auto max-lg:h-auto"
//               alt="hero"
//             />
//           </div>
//         </div>
//       </Element>
//     </section>
//   );
// };

// export default HeroSection;


// import { Element, Link as LinkScroll } from "react-scroll";
// import Button from "../../components/Button.jsx";
// import NewIA from '../../assets/NewIA.png';
// import HeroAI from '../../assets/HeroAI.png';

// const HeroSection = () => {
//   return (
//     <section className="relative bg-[#080D27] pt-20 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32 overflow-hidden">
//       <Element name="hero">
//         <div className="mx-auto max-w-[1252px] px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
//           {/* LEFT: Text content */}
//           <div className="relative z-10 max-w-xl text-center lg:text-left">
//             <div className="mb-5 uppercase text-[#C8EA80] text-xs font-bold tracking-[0.3em]">
//               Video Editing
//             </div>
//             <h1 className="mb-6 text-[52px] lg:text-[72px] font-black leading-tight tracking-tight text-[#EAEDFF] uppercase">
//               Amazingly simple
//             </h1>
//             <p className="text-lg lg:text-xl text-[#EAEDFF] mb-10 max-w-md leading-relaxed mx-auto lg:mx-0">
//               We designed XORA AI Video Editor to be easy to use, quick to learn, and surprisingly powerful.
//             </p>
//             <LinkScroll to="features" offset={-100} spy smooth>
//               <Button icon="/images/zap.svg">Try it now</Button>
//             </LinkScroll>
//           </div>

//           {/* RIGHT: Image with glass shadow */}
//           <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl mt-10">
//             {/* Glass shadow effect */}
//             <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl z-0" />
//             {/* Image */}
//             <img
//               src={HeroAI}
//               alt="hero"
//               className="relative z-10 w-full h-auto rounded-3xl"
//             />
//           </div>
//         </div>
//       </Element>
//     </section>
//   );
// };

// export default HeroSection;


// import { Element, Link as LinkScroll } from "react-scroll";
// import { FiZap } from "react-icons/fi"; // ✅ Lightning icon from react-icons
// import Button from "../../components/Button.jsx";

// const HeroSection = () => {
//   return (
//     <section className="relative bg-[#080D27] pt-20 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32 overflow-hidden">
//       <Element name="hero">
//         <div className="mx-auto max-w-[1252px] px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
//           {/* LEFT: Text content */}
//           <div className="relative z-10 max-w-xl text-center lg:text-left">
//             <div className="mb-5 uppercase text-[#C8EA80] text-xs font-bold tracking-[0.3em]">
//               AI-Powered Code Review
//             </div>
//             <h1 className="mb-6 text-[42px] sm:text-[52px] lg:text-[68px] font-black leading-tight tracking-tight text-[#EAEDFF] uppercase">
//               Analyze. Fix. Commit.
//             </h1>
//             <p className="text-lg lg:text-xl text-[#EAEDFF] mb-10 max-w-md leading-relaxed mx-auto lg:mx-0">
//               IntelliCodeAI helps developers instantly review, fix, and improve code using AI — with deep GitHub integration and powerful analysis tools.
//             </p>
//             <LinkScroll to="features" offset={-100} spy smooth>
//               <Button>
//                 <div className="flex items-center gap-2">
//                   <FiZap className="text-yellow-400 text-xl" />
//                   Start Free Analysis
//                 </div>
//               </Button>
//             </LinkScroll>
//           </div>

//           {/* RIGHT: Video Preview */}
//           <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl mt-10 rounded-3xl overflow-hidden shadow-2xl z-10">
//             <video
//               src="/videos/IntelliCodeAI.mp4" // Replace with your actual demo video
//               autoPlay
//               loop
//               muted
//               playsInline
//               className="w-full h-auto object-cover rounded-3xl"
//             />
//           </div>
//         </div>
//       </Element>
//     </section>
//   );
// };

// export default HeroSection;


import { Element, Link as LinkScroll } from "react-scroll";
import { FiZap } from "react-icons/fi";
import Button from "../../components/Button.jsx";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#080D27] via-[#0E1337] to-[#0F1A45] pt-20 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32 overflow-hidden">
      <Element name="hero">
        <div className="mx-auto max-w-[1252px] px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
          {/* LEFT: Text content */}
          <div className="relative z-10 max-w-xl text-center lg:text-left">
            <div className="mb-5 uppercase text-[#C8EA80] text-xs font-bold tracking-[0.3em]">
              AI-Powered Code Review
            </div>
            <h1 className="mb-6 text-[42px] sm:text-[52px] lg:text-[68px] font-black leading-tight tracking-tight text-[#EAEDFF] uppercase">
              Analyze. Fix. Commit.
            </h1>
            <p className="text-lg lg:text-xl text-[#EAEDFF] mb-10 max-w-md leading-relaxed mx-auto lg:mx-0">
              <span className="font-semibold text-[#A5FF90]">
                IntelliCode
                <span className="text-[#FFD86F] font-bold">AI</span>
              </span>{" "}
              helps developers instantly review, fix, and improve code using AI — with deep GitHub integration and powerful analysis tools.
            </p>

            <LinkScroll to="features" offset={-100} spy smooth>
              <Button>
                <div className="flex items-center gap-2">
                  <FiZap className="text-yellow-400 text-xl" />
                  Start Free Analysis
                </div>
              </Button>
            </LinkScroll>
          </div>

          {/* RIGHT: Video Preview */}
          <div className="relative w-full max-w-xl lg:max-w-[640px] xl:max-w-[720px] aspect-video mt-10 overflow-hidden rounded-sm shadow-[0_0_100px_0_rgba(114,137,218,0.3)] ring-1 ring-white/10 transition-all duration-500 hover:scale-[1.01] z-10">
  <video
    src="/videos/IntelliCodeAI1.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover"
  />
</div>

        </div>
      </Element>
    </section>
  );
};

export default HeroSection;
