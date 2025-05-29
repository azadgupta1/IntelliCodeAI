// import React from 'react';
// import { FaGithub } from 'react-icons/fa'; // install react-icons if not already
// import Footer from './Footer';
// import githubImg from '../../assets/github.svg';

// function Login() {
//   return (
//     <div>
//         <div className="flex flex-col items-center justify-start min-h-screen pt-20 px-4 bg-gray-50">
          
//           {/* Heading */}
//           <h2 className="text-6xl font-extrabold mb-20"> WELCOME BACK!</h2>

//           {/* Login Card */}
//           <div className="bg-white shadow-lg rounded-lg p-4 w-100 max-w-md text-center">
//             <h1 className="text-2xl font-semibold mb-6 mt-5">Sign in with GitHub</h1>

//             {/* GitHub Button */}
//             <div className="flex justify-center">
//               <button className="bg-white border-2 border-blue-500 rounded-2xl py-3 px-3 transition flex items-center justify-center">
//                 <img src={githubImg} alt="GitHub" className="w-8 h-8" />
//               </button>
//             </div>

//             <hr className="mt-10 border-gray-200 border-1 rounded-sm" />


//             {/* Sign Up Link */}
//           <p className="mt-6 text-gray-600">
//             Don't have an account?{' '}
//             <a href="/signup" className="text-blue-600 hover:underline">
//               Sign Up
//             </a>
//           </p>



//           </div>

          

          
//         </div>
//           <Footer />
//     </div>
//   );
// }

// export default Login;



import React from 'react';
import { FaGithub } from 'react-icons/fa'; // install react-icons if not already
import Footer from './Footer';
import githubImg from '../../assets/github.svg';
import { githubLogin } from '../../services/authServices';

function Login() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 mt-20">
      {/* Main Content */}
      <div className="flex flex-col items-center justify-start flex-grow pt-16 px-4 sm:px-6 md:px-8 mb-10">
        
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
