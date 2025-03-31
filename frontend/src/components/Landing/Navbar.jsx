// import { Link } from "react-router-dom";
// import { githubLogin } from "../../services/authServices"

// const Navbar = () => {
    

//     return (
//         <nav className="bg-gray-800 text-white px-8 py-4 flex justify-between items-center">
//             <div className="text-2xl font-bold">IntelliCodeAI</div>
//             <ul className="flex space-x-6">
//                 <li><Link to="/" className="hover:text-indigo-400">Home</Link></li>
//                 <li><Link to="/uploadfile" className="hover:text-indigo-400">Upload File</Link></li>
//                 <li onClick={githubLogin} className="hover:text-indigo-400 cursor-pointer">GitHub Analysis</li>
//                 <li><Link to="/docs" className="hover:text-indigo-400">Docs</Link></li>
//                 <li><Link to="/login" className="hover:text-indigo-400">Login</Link></li>
//             </ul>
//         </nav>
//     );
// };

// export default Navbar;


import { Link } from "react-router-dom";
import { githubLogin } from "../../services/authServices";
import  IntelliCodeAI  from  "../../assets/IntelliCodeAI.png";

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-10 py-5 flex justify-between items-center border-b border-gray-800 shadow-md">
      {/* <div className="text-3xl font-extrabold tracking-wide text-indigo-400 hover:text-indigo-300 transition">
        IntelliCodeAI 🚀
      </div> */}

      <div className="text-3xl font-extrabold tracking-wide text-indigo-400 hover:text-indigo-300 transition">
        <img src={IntelliCodeAI} alt="IntelliCodeAI" className="h-12 w-auto" />
      </div>

      <ul className="flex space-x-8 text-lg">
        {["Home", "Upload File", "Docs", "Login"].map((item, index) => (
          <li key={index}>
            <Link to={`/${item.toLowerCase().replace(" ", "")}`} className="hover:text-indigo-400 transition">
              {item}
            </Link>
          </li>
        ))}
        <li onClick={githubLogin} className="hover:text-indigo-400 cursor-pointer transition">
          GitHub Analysis
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
