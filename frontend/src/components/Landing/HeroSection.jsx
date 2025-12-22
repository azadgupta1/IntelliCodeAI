
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




import React from "react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-pink-50 to-white">
      {/* Background blur shapes */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-violet-300/30 blur-3xl" />
      <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-pink-300/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <div>
            <span className="inline-flex items-center rounded-full border border-violet-200 bg-white px-4 py-1 text-sm font-medium text-violet-700 shadow-sm">
              AI‑Powered Interview Intelligence
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
              Smarter Interviews with
              <span className="block bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
                IntelliCodeAI
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
              IntelliCodeAI analyzes facial expressions and behavioral cues in real‑time to help recruiters make confident, data‑driven hiring decisions — and candidates improve with intelligent feedback.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:opacity-90">
                Get Started
              </button>
              <button className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50">
                Watch Demo
              </button>
            </div>

            <div className="mt-10 flex items-center gap-8 text-sm text-gray-500">
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-gray-900">3+</span>
                Dashboards
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-gray-900">AI</span>
                Real‑time Analysis
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-gray-900">Secure</span>
                SaaS Platform
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative">
            <div className="rounded-3xl border border-violet-100 bg-white/70 p-6 shadow-xl backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-xl bg-violet-50 p-4">
                  <p className="text-sm font-medium text-violet-700">Confidence Level</p>
                  <div className="mt-2 h-2 w-full rounded-full bg-violet-100">
                    <div className="h-2 w-4/5 rounded-full bg-violet-500" />
                  </div>
                </div>

                <div className="rounded-xl bg-pink-50 p-4">
                  <p className="text-sm font-medium text-pink-700">Stress Detection</p>
                  <div className="mt-2 h-2 w-full rounded-full bg-pink-100">
                    <div className="h-2 w-2/5 rounded-full bg-pink-500" />
                  </div>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm font-medium text-gray-700">Engagement</p>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                    <div className="h-2 w-3/4 rounded-full bg-gray-800" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
