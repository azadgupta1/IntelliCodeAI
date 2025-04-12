import React from "react";
import { githubLogin } from "../services/authServices";
import IntelliCodeAI_1 from "../assets/IntelliCodeAI_1.png"; // Make sure this path is correct

export const Signup = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-[#00ffd1] opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-[#00ffd1] opacity-10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl shadow-[0_0_60px_#00ffd180] p-10 max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={IntelliCodeAI_1} alt="IntelliCodeAI Logo" className="w-16 h-16" />
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Join <span className="text-[#00ffd1]">IntelliCodeAI</span>
        </h2>

        {/* Subtitle */}
        <p className="text-gray-400 text-sm sm:text-base mb-6">
          Sign up with your GitHub account to unlock powerful code intelligence tools.
        </p>

        {/* Divider */}
        <div className="border-t border-white/10 mb-6"></div>

        {/* GitHub Button */}
        <button
          onClick={githubLogin}
          className="w-full bg-[#00ffd1] text-black px-5 py-3 rounded-lg font-semibold hover:shadow-[0_0_20px_#00ffd1] hover:bg-[#00e6b8] transition duration-300"
        >
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 .297a12 12 0 0 0-3.797 23.4c.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.042-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.753-1.333-1.753-1.09-.745.084-.729.084-.729 1.205.084 1.84 1.238 1.84 1.238 1.07 1.834 2.805 1.304 3.492.997.11-.776.42-1.304.763-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.467-2.382 1.236-3.222-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23A11.5 11.5 0 0 1 12 6.844c1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.653.243 2.873.12 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.805 5.625-5.475 5.92.432.37.816 1.102.816 2.222 0 1.606-.015 2.898-.015 3.293 0 .319.216.694.825.576A12 12 0 0 0 12 .297"
              />
            </svg>
            Sign up with GitHub
          </span>
        </button>
      </div>
    </div>
  );
};
