import React from 'react';
import { FaGithub } from 'react-icons/fa'; // install react-icons if not already
import Footer from '../../components/Landing/Footer';
import githubImg from '../../assets/github.svg';
import { githubLogin } from '../../services/authServices';

function Login() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-sky-300 via-blue-500 to-violet-300 pt-20">
      {/* Main Content */}
      <div className="flex flex-col items-center justify-start flex-grow pt-16 px-4 sm:px-6 md:px-8 mb-100">
        
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-12 text-center">
          WELCOME BACK!
        </h2>

        {/* Login Card */}
        <div className="bg-white shadow-lg rounded-lg px-6 py-8 w-full max-w-sm sm:max-w-md text-center">
          <h1 className="text-xl sm:text-2xl font-semibold mb-6">Sign in with GitHub</h1>

          {/* GitHub Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={githubLogin}
              className="bg-white border-2 border-blue-500 rounded-2xl py-3 px-3 transition flex items-center justify-center hover:shadow-md">
              <img src={githubImg} alt="GitHub" className="w-8 h-8" />
            </button>
          </div>

          {/* Divider */}
          <hr className="mt-4 border-gray-200 border-1 rounded-sm" />

          {/* Sign Up Link */}
          <p className="mt-6 text-gray-600 text-sm sm:text-base">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Login;
