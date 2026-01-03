
// import { Element, Link as LinkScroll } from "react-scroll";
// import { FiZap } from "react-icons/fi";

// const HeroSection = () => {
//   return (
//     <section className="relative bg-gradient-to-br from-[#080D27] via-[#0E1337] to-[#0F1A45] mt-0 pt-20 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32 overflow-hidden">
//       <Element name="hero">
//         <div className="mx-auto max-w-[1252px] px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
//           {/* LEFT: Text content */}
//           <div className="relative z-10 max-w-xl text-center lg:text-left">
//             <div className="mb-5 uppercase text-[#C8EA80] text-xs font-bold tracking-[0.3em]">
//               AI-Powered Code Review
//             </div>
//             <h1 className="mb-6 text-[42px] sm:text-[52px] lg:text-[68px] font-black leading-tight tracking-tight text-[#EAEDFF] uppercase">
//               Analyze. Fix. Commit.
//             </h1>
//             <p className="text-lg lg:text-xl text-[#EAEDFF] mb-10 max-w-md leading-relaxed mx-auto lg:mx-0">
//               <span className="font-semibold text-[#A5FF90]">
//                 IntelliCode
//                 <span className="text-[#FFD86F] font-bold">AI</span>
//               </span>{" "}
//               helps developers instantly review, fix, and improve code using AI — with deep GitHub integration and powerful analysis tools.
//             </p>

//             <LinkScroll to="features" offset={-100} spy={true} smooth={true}>
//               <button
//                 className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-[#080D27] font-bold text-sm shadow-lg hover:shadow-xl transition duration-300 hover:scale-105"
//               >
//                 <FiZap className="text-xl text-blue-700 group-hover:animate-pulse" />
//                 Start Free Analysis
//               </button>
//             </LinkScroll>
//           </div>

//           {/* RIGHT: Video Preview */}
//           {/* <div className="relative w-full max-w-xl lg:max-w-[720px] aspect-video mt-10 overflow-hidden rounded-xl shadow-2xl ring-2 ring-[#3C52D9]/50 transition-transform duration-500 hover:scale-105 z-10">
//             <video
//               src="/videos/IntelliCodeAI1.mp4"
//               autoPlay
//               loop
//               muted
//               playsInline
//               className="w-full h-full object-contain"
//             />
//           </div> */}
//         </div>
//       </Element>
//     </section>
//   );
// };

// export default HeroSection;






// import React from "react";

// export default function HeroSection() {
//   return (
//     <section className="relative overflow-hidden bg-gradient-to-tr from-sky-700 via-blue-800 to-violet-500">
//       {/* Soft background accents */}
//       <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-sky-200/40 blur-3xl" />
//       <div className="pointer-events-none absolute top-40 right-0 h-[400px] w-[400px] rounded-full bg-violet-200/30 blur-3xl" />

//       {/* Main content */}
//       <div className="relative mx-auto max-w-5xl px-6 py-28 text-center">
//         <span className="inline-flex items-center rounded-full border border-sky-200 bg-white px-4 py-1 text-sm font-medium text-sky-700 shadow-sm">
//           AI-Powered Interview Intelligence
//         </span>

//         <h1 className="mt-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
//           Transform Hiring with
//           <span className="mt-2 block bg-gradient-to-r from-sky-600 to-violet-600 bg-clip-text text-transparent">
//             IntelliCodeAI
//           </span>
//         </h1>

//         <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
//           IntelliCodeAI delivers real-time behavioral insights and facial-expression
//           analysis to help organizations conduct fair, data-driven, and confident
//           interviews at scale.
//         </p>

//         <div className="mt-10 flex flex-wrap justify-center gap-4">
//           <button className="rounded-xl bg-gradient-to-r from-sky-600 to-violet-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:opacity-90">
//             Get Started
//           </button>
//           <button className="rounded-xl border border-gray-300 bg-white px-8 py-3 text-base font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50">
//             Request Demo
//           </button>
//         </div>

//         <div className="mt-14 flex justify-center gap-12 text-sm text-gray-500">
//           <div>
//             <div className="text-2xl font-semibold text-gray-900">Enterprise-Ready</div>
//             Secure Platform
//           </div>
//           <div>
//             <div className="text-2xl font-semibold text-gray-900">Real-Time AI</div>
//             Behavioral Insights
//           </div>
//           <div>
//             <div className="text-2xl font-semibold text-gray-900">Scalable</div>
//             Hiring Intelligence
//           </div>
//         </div>
//       </div>

//       {/* Scrolling logos */}
//       <div className="relative border-t border-sky-100 bg-white/70 py-10 backdrop-blur">
//         <p className="mb-6 text-center text-sm font-medium text-gray-500">
//           Trusted by AI-driven organizations worldwide
//         </p>

//         <div className="overflow-hidden">
//           <div className="flex w-max animate-marquee gap-14 px-10">
//             {[
//               "OpenAI",
//               "Google AI",
//               "Microsoft",
//               "IBM",
//               "Amazon AI",
//               "NVIDIA",
//               "Meta AI",
//               "Salesforce",
//             ].map((name, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-center text-lg font-semibold text-gray-400 grayscale transition hover:grayscale-0"
//               >
//                 {name}
//               </div>
//             ))}

//             {/* Duplicate for seamless loop */}
//             {[
//               "OpenAI",
//               "Google AI",
//               "Microsoft",
//               "IBM",
//               "Amazon AI",
//               "NVIDIA",
//               "Meta AI",
//               "Salesforce",
//             ].map((name, index) => (
//               <div
//                 key={`dup-${index}`}
//                 className="flex items-center justify-center text-lg font-semibold text-gray-400 grayscale transition hover:grayscale-0"
//               >
//                 {name}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Marquee animation */}
//       <style jsx>{`
//         @keyframes marquee {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }
//         .animate-marquee {
//           animation: marquee 25s linear infinite;
//         }
//       `}</style>
//     </section>
//   );
// }






















import React from "react";
import { Link, useNavigate } from "react-router-dom";



export default function HeroSection() {

  const navigate = useNavigate();

  const loginpage = () => {
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-tr from-sky-500 via-blue-800 to-violet-500">
      {/* Soft background accents */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-sky-300/30 blur-3xl" />
      <div className="pointer-events-none absolute top-40 right-0 h-[400px] w-[400px] rounded-full bg-violet-300/30 blur-3xl" />

      {/* Main content */}
      <div className="relative mx-auto max-w-5xl px-6 py-30 text-center">
        <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm font-medium text-white backdrop-blur">
          AI-Powered Code Review Platform
        </span>

        <h1 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl">
          Ship Better Code with
          <span className="mt-2 block bg-gradient-to-r from-sky-200 to-violet-200 bg-clip-text text-transparent">
            IntelliCodeAI
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sky-100">
          IntelliCodeAI automatically reviews your code to detect bugs, security
          vulnerabilities, and performance issues — delivering intelligent,
          actionable feedback that helps developers write cleaner, safer, and
          more maintainable code.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button onClick={loginpage} className="rounded-2xl bg-gray-950 px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-gray-900">
            Analyze Code
          </button>

          <button onClick={loginpage} className="rounded-2xl border-2 border-white/60 bg-transparent px-8 py-3 text-base font-semibold text-white transition hover:bg-white/10">
            View Dashboard
          </button>
        </div>

        <div className="mt-14 flex justify-center gap-12 text-sm text-sky-100">
          <div>
            <div className="text-2xl font-semibold text-white">AI Review</div>
            Bugs & Code Smells
          </div>
          <div>
            <div className="text-2xl font-semibold text-white">Security</div>
            Vulnerability Detection
          </div>
          <div>
            <div className="text-2xl font-semibold text-white">Quality</div>
            Performance Insights
          </div>
        </div>
      </div>

      {/* Scrolling use-cases */}
      <div className="relative py-10">
        <p className="mb-6 text-center text-sm font-medium text-sky-100">
          Built for modern development workflows
        </p>

        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee gap-14 px-10">
            {[
              "AI Code Review",
              "Bug Detection",
              "Security Analysis",
              "Code Quality Scoring",
              "Best Practice Suggestions",
              "Developer Productivity",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center text-lg font-semibold text-white/70 transition hover:text-white"
              >
                {item}
              </div>
            ))}

            {[
              "AI Code Review",
              "Bug Detection",
              "Security Analysis",
              "Code Quality Scoring",
              "Best Practice Suggestions",
              "Developer Productivity",
            ].map((item, index) => (
              <div
                key={`dup-${index}`}
                className="flex items-center justify-center text-lg font-semibold text-white/70 transition hover:text-white"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
}
