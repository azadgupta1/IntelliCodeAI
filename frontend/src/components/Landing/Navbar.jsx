import { Link } from "react-router-dom";
import { githubLogin } from "../../services/authServices"

const Navbar = () => {
    

    return (
        <nav className="bg-gray-800 text-white px-8 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold">IntelliCodeAI</div>
            <ul className="flex space-x-6">
                <li><Link to="/" className="hover:text-indigo-400">Home</Link></li>
                <li><Link to="/uploadfile" className="hover:text-indigo-400">Upload File</Link></li>
                <li onClick={githubLogin} className="hover:text-indigo-400 cursor-pointer">GitHub Analysis</li>
                <li><Link to="/docs" className="hover:text-indigo-400">Docs</Link></li>
                <li><Link to="/login" className="hover:text-indigo-400">Login</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;




// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth"; // Now correctly imported

// const Navbar = () => {
//     const { user, logout } = useAuth();
//     const navigate = useNavigate();

//     const handleLogin = () => {
//         window.location.href = "http://localhost:3000/auth/github/login";
//     };

//     return (
//         <nav className="bg-gray-800 text-white px-8 py-4 flex justify-between items-center">
//             <div className="text-2xl font-bold">IntelliCodeAI</div>
//             <ul className="flex space-x-6">
//                 <li><Link to="/" className="hover:text-indigo-400">Home</Link></li>
//                 <li><Link to="/uploadfile" className="hover:text-indigo-400">Upload File</Link></li>
//                 {user ? (
//                     <>
//                         <li><Link to="/dashboard" className="hover:text-indigo-400">GitHub Analysis</Link></li>
//                         <li><button onClick={logout} className="hover:text-red-400">Logout</button></li>
//                     </>
//                 ) : (
//                     <li><button onClick={handleLogin} className="hover:text-indigo-400">Login with GitHub</button></li>
//                 )}
//             </ul>
//         </nav>
//     );
// };

// export default Navbar;





// ------------------------------------------------------------------- ///



// // src/components/Landing/Navbar.jsx
// import { Link } from "react-router-dom";

// const Navbar = () => {
  

//   return (
//     <nav className="bg-gray-800 text-white px-8 py-4 flex justify-between items-center">
//       <div className="text-2xl font-bold">IntelliCodeAI</div>
//       <ul className="flex space-x-6">
//         <li><Link to="/" className="hover:text-indigo-400">Home</Link></li>
//         <li><Link to="/uploadfile" className="hover:text-indigo-400">Upload File</Link></li>
//         <li>GitHub Analysis</li>
//         <li><Link to="/docs" className="hover:text-indigo-400">Docs</Link></li>
//         <li><Link to="/login" className="hover:text-indigo-400">Login</Link></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;




