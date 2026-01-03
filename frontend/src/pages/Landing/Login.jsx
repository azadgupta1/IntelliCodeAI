// import React from 'react';
// import { FaGithub } from 'react-icons/fa'; // install react-icons if not already
// import Footer from '../../components/Landing/Footer';
// import githubImg from '../../assets/github.svg';
// import { githubLogin } from '../../services/authServices';

// function Login() {
//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-tr from-sky-300 via-blue-500 to-violet-300 pt-20">
//       {/* Main Content */}
//       <div className="flex flex-col items-center justify-start flex-grow pt-16 px-4 sm:px-6 md:px-8 mb-100">
        
//         {/* Heading */}
//         <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-12 text-center">
//           WELCOME BACK!
//         </h2>

//         {/* Login Card */}
//         <div className="bg-white shadow-lg rounded-lg px-6 py-8 w-full max-w-sm sm:max-w-md text-center">
//           <h1 className="text-xl sm:text-2xl font-semibold mb-6">Sign in with GitHub</h1>

//           {/* GitHub Button */}
//           <div className="flex justify-center mb-8">
//             <button
//               onClick={githubLogin}
//               className="bg-white border-2 border-blue-500 rounded-2xl py-3 px-3 transition flex items-center justify-center hover:shadow-md">
//               <img src={githubImg} alt="GitHub" className="w-8 h-8" />
//             </button>
//           </div>

//           {/* Divider */}
//           <hr className="mt-4 border-gray-200 border-1 rounded-sm" />

//           {/* Sign Up Link */}
//           <p className="mt-6 text-gray-600 text-sm sm:text-base">
//             Don't have an account?{' '}
//             <a href="/signup" className="text-blue-600 hover:underline">
//               Sign Up
//             </a>
//           </p>
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }

// export default Login;



















import React from "react";
import { FaGitlab, FaBitbucket } from "react-icons/fa";
import Footer from "../../components/Landing/Footer";
import githubImg from "../../assets/github.svg";
import { githubLogin } from "../../services/authServices";

function Login() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-gradient-to-tr from-sky-500 via-blue-800 to-violet-500">
      {/* Background glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-120px] left-[-100px] w-[340px] h-[340px] bg-white/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-100px] w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* Center Content */}
      <div className="flex-grow flex items-center justify-center px-4 py-50 z-10">
        <div className="backdrop-blur-xl bg-white/90 shadow-2xl rounded-3xl px-8 py-10 w-full max-w-md text-center space-y-6 border border-white/40">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            Welcome Back
          </h2>

          {/* Subtext */}
          <p className="text-gray-600 text-sm sm:text-base">
            Sign in to continue reviewing code with IntelliCodeAI.
          </p>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* OAuth Buttons */}
          <div className="flex justify-center gap-6 pt-4">
            {/* GitHub (Active) */}
            <button
              onClick={githubLogin}
              className="bg-white border-2 border-blue-500 rounded-2xl p-4 hover:shadow-lg transition hover:scale-[1.03]"
            >
              <img src={githubImg} alt="GitHub" className="w-9 h-9" />
            </button>

            {/* GitLab (Coming Soon) */}
            <div className="relative group">
              <div className="p-4 rounded-2xl border border-gray-300 grayscale blur-[1px] cursor-not-allowed bg-white">
                <FaGitlab className="w-9 h-9 text-orange-500" />
              </div>
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                Coming Soon
              </span>
            </div>

            {/* Bitbucket (Coming Soon) */}
            <div className="relative group">
              <div className="p-4 rounded-2xl border border-gray-300 grayscale blur-[1px] cursor-not-allowed bg-white">
                <FaBitbucket className="w-9 h-9 text-blue-600" />
              </div>
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Signup redirect */}
          <p className="text-gray-600 text-sm sm:text-base pt-4">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 font-medium hover:underline">
              Create one
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full z-10">
        <Footer />
      </div>
    </div>
  );
}

export default Login;
