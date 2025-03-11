import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-8 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold">IntelliCodeAI</div>
      <ul className="flex space-x-6">
        <li><Link to="/" className="hover:text-indigo-400">Home</Link></li>
        <li><Link to="/uploadfile" className="hover:text-indigo-400">Upload File</Link></li>
        <li>
          <a href="http://localhost:3000/auth/github/login" className="hover:text-indigo-400">
            GitHub Analysis
          </a>
        </li>

        <li><Link to="/docs" className="hover:text-indigo-400">Docs</Link></li>
        <li><Link to="/login" className="hover:text-indigo-400">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;




// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const handleGithubLogin = () => {
//     window.location.href = "http://localhost:3000/auth/github/login"; // Adjust for your backend URL
//   };

//   return (
//     <nav className="bg-gray-800 text-white px-8 py-4 flex justify-between items-center">
//       <div className="text-2xl font-bold">IntelliCodeAI</div>
//       <ul className="flex space-x-6">
//         <li><Link to="/" className="hover:text-indigo-400">Home</Link></li>
//         <li><Link to="/uploadfile" className="hover:text-indigo-400">Upload File</Link></li>
//         <li>
//           <button onClick={handleGithubLogin} className="hover:text-indigo-400">
//             GitHub Analysis
//           </button>
//         </li>
//         <li><Link to="/docs" className="hover:text-indigo-400">Docs</Link></li>
//         <li><Link to="/login" className="hover:text-indigo-400">Login</Link></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

