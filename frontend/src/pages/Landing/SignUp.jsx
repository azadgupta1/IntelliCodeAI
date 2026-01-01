import React from "react";
import { githubLogin } from "../../services/authServices";
import IntelliCodeAI_1 from "../../assets/IntelliCodeAI_1.png";

export const Signup = () => {
  return (
    <div className="min-h-screen bg-[#080D27] pt-24 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Background gradient bubbles (same tone) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-120px] left-[-80px] w-[300px] h-[300px] bg-[#080D27] opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-100px] right-[-80px] w-[250px] h-[250px] bg-[#080D27] opacity-10 rounded-full blur-2xl" />
      </div>

      {/* Signup box */}
      <div className="relative z-10 backdrop-blur-md bg-[#080D27] border border-white/10 rounded-3xl p-8 sm:p-10 max-w-md w-full text-center space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src={IntelliCodeAI_1}
            alt="IntelliCodeAI Logo"
            className="w-14 h-14 sm:w-16 sm:h-16"
          />
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold leading-snug text-white">
          Join <span className="text-white">IntelliCodeAI</span>
        </h2>

        {/* Subtitle */}
        <p className="text-white text-sm sm:text-base">
          Sign up with your GitHub account to unlock powerful code intelligence tools.
        </p>

        {/* Divider */}
        <div className="border-t border-white/20"></div>

        {/* GitHub Sign Up Button */}
        <button
          onClick={githubLogin}
          className="w-full bg-[#080D27] text-white px-5 py-3 rounded-lg font-semibold border border-white/20"
        >
          <span className="flex items-center justify-center gap-2">
            Sign up with GitHub
          </span>
        </button>
      </div>
    </div>
  );
};
