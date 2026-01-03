// import React from "react";
// import { githubLogin } from "../../services/authServices";
// import IntelliCodeAI_1 from "../../assets/NewIA.png";

// export const Signup = () => {
//   return (
//     <div className="min-h-screen bg-[#080D27] pt-24 px-4 flex items-center justify-center relative overflow-hidden">
//       {/* Background gradient bubbles (same tone) */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute top-[-120px] left-[-80px] w-[300px] h-[300px] bg-[#080D27] opacity-20 rounded-full blur-3xl" />
//         <div className="absolute bottom-[-100px] right-[-80px] w-[250px] h-[250px] bg-[#080D27] opacity-10 rounded-full blur-2xl" />
//       </div>

//       {/* Signup box */}
//       <div className="relative z-10 backdrop-blur-md bg-[#080D27] border border-white/10 rounded-3xl p-8 sm:p-10 max-w-md w-full text-center space-y-6">
//         {/* Logo */}
//         <div className="flex justify-center">
//           <img
//             src={IntelliCodeAI_1}
//             alt="IntelliCodeAI Logo"
//             className="w-14 h-14 sm:w-16 sm:h-16"
//           />
//         </div>

//         {/* Heading */}
//         <h2 className="text-3xl sm:text-4xl font-bold leading-snug text-white">
//           Join <span className="text-white">IntelliCodeAI</span>
//         </h2>

//         {/* Subtitle */}
//         <p className="text-white text-sm sm:text-base">
//           Sign up with your GitHub account to unlock powerful code intelligence tools.
//         </p>

//         {/* Divider */}
//         <div className="border-t border-white/20"></div>

//         {/* GitHub Sign Up Button */}
//         <button
//           onClick={githubLogin}
//           className="w-full bg-[#080D27] text-white px-5 py-3 rounded-lg font-semibold border border-white/20"
//         >
//           <span className="flex items-center justify-center gap-2">
//             Sign up with GitHub
//           </span>
//         </button>
//       </div>
//     </div>
//   );
// };









import React from "react";
import { FaGitlab, FaBitbucket } from "react-icons/fa";
import { githubLogin } from "../../services/authServices";
import IntelliCodeAI_1 from "../../assets/NewIA.png";
import githubImg from "../../assets/github.svg";
import Footer from "../../components/Landing/Footer";

export const Signup = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-sky-500 via-blue-800 to-violet-500 relative overflow-hidden">
      

      {/* Centered Signup Section */}
      <div className="flex-grow flex items-center justify-center px-4 py-30 z-10">
        {/* Signup Card */}
        <div className="backdrop-blur-xl bg-white/90 border border-white/40 shadow-2xl rounded-3xl p-8 sm:p-10 max-w-md w-full text-center space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <img
              src={IntelliCodeAI_1}
              alt="IntelliCodeAI Logo"
              className="w-14 h-14 sm:w-16 sm:h-16"
            />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Create your IntelliCodeAI account
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-sm sm:text-base">
            Get started in seconds. Connect your GitHub and let AI review your code.
          </p>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* OAuth Buttons */}
          <div className="flex justify-center gap-6 pt-2">
            {/* GitHub (Active) */}
            <button
              onClick={githubLogin}
              className="border-2 border-blue-500 rounded-2xl p-4 bg-white hover:shadow-lg transition hover:scale-[1.03]"
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

          {/* Terms */}
          <p className="text-xs text-gray-500 pt-4">
            By signing up, you agree to IntelliCodeAI’s Terms & Privacy Policy.
          </p>

          {/* Login redirect */}
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-medium hover:underline">
              Sign in
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
};
