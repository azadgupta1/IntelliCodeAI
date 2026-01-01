import React from "react";
import AI_1 from "../../assets/AI_1.svg";

const AIFixSection = () => {
  return (
    <section className="bg-[#6e30d9] py-16 px-4 sm:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left - Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <img
            src={AI_1}
            alt="AI Fixing Code"
            className="w-full h-full object-contain lg:max-h-[500px]"
          />
        </div>

        {/* Right - Text Content */}
        <div className="w-full lg:w-1/2 text-white">
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Find Issues. <span className="text-[#00ffd1]">Fix Smarter.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-200">
            IntelliCodeAI reviews your code using AI after every GitHub commit — detecting bugs, suggesting improvements, and generating ready-to-apply fixes directly in your dashboard or IDE.
          </p>

          <ul className="mt-6 space-y-3 text-sm sm:text-base text-white/90 list-disc list-inside">
            <li>AI-powered bug detection and smart suggestions</li>
            <li>Fix-ready solutions for every issue</li>
            <li>Auto-generates tests for low-coverage files</li>
            <li>One-click commits back to GitHub</li>
            <li>Integrates with GitHub, VSCode, Cursor & more</li>
          </ul>

          <button className="mt-8 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition duration-300 shadow">
            Connect Your GitHub →
          </button>
        </div>
      </div>
    </section>
  );
};

export default AIFixSection;
