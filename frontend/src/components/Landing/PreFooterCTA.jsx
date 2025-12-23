import React from "react";

export default function PreFooterCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-tr from-sky-700 via-blue-800 to-violet-500">
      {/* Glow accents */}
      <div className="pointer-events-none absolute -top-24 left-1/3 h-[400px] w-[400px] rounded-full bg-sky-300/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[350px] w-[350px] rounded-full bg-violet-300/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-24 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl xl:text-5xl">
          Ready to Improve Your Code Quality with
          <span className="mt-2 block bg-gradient-to-r from-sky-200 to-violet-200 bg-clip-text text-transparent">
            IntelliCodeAI?
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sky-100">
          Start analyzing your code with AI-powered insights that detect bugs,
          security issues, and performance bottlenecks — all in seconds. Build
          faster, ship safer, and maintain higher code standards across every
          project.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="rounded-2xl bg-gray-900 px-10 py-4 text-base font-semibold text-white shadow-xl transition hover:bg-gray-900">
            Get Started
          </button>

          <button className="rounded-2xl border-2 border-white/60 bg-transparent px-10 py-4 text-base font-semibold text-white transition hover:bg-white/10">
            View Documentation
          </button>
        </div>

      </div>
    </section>
  );
}
