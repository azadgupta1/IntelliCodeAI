
// import { Link, useNavigate } from "react-router-dom";
// import { githubLogin } from "../../services/authServices";
// import IntelliCodeAI_1 from "../../assets/IntelliCodeAI_1.png";
// import IntelliCodeAI_2 from "../../assets/IntelliCodeAI_2.png";
// import IntelliCodeAI_3 from "../../assets/IntelliCodeAI_3.png";



// import { useState } from "react";

// const Navbar = () => {
//   const [showFeatures, setShowFeatures] = useState(false);
//   const [showDocs, setShowDocs] = useState(false);
//   const navigate = useNavigate();

//   return (
//     // <nav className="bg-black text-white px-10 py-1 shadow-md  flex items-center justify-between relative z-50">
//     <nav className="fixed top-0 left-0 h-20 w-full bg-white text-black px-10 py-1 shadow-md flex items-center justify-between z-50">

//       {/* Logo + Name */}
//       {/* <div
//         className="flex items-center space-x-0 transform transition-transform duration-200 hover:scale-105 cursor-pointer"
//         onClick={(e) => e.preventDefault()}
//       >
//         <img
//           src={IntelliCodeAI_3}
//           alt="IntelliCodeAI"
//           className="h-15 w-22"
//         />
//         <span
//           className="text-2xl font-extrabold tracking-wider"
//           style={{
//             color: "#6A3CB3",
//             fontFamily: "'Orbitron', sans-serif",
//             letterSpacing: "0.00125em"
//           }}
//         >
//           IntelliCode<span style={{ color: "#4B5563" }}>AI</span>  #6A3CB3
//         </span>
//       </div> */}

//         <div
//           className="flex items-center gap-3 cursor-pointer group"
//           onClick={(e) => e.preventDefault()}
//         >
//           <img
//             src={IntelliCodeAI_3}
//             alt="IntelliCodeAI"
//             className="h-15 w-auto group-hover:scale-105 transition-transform duration-200"
//           />
//           <span className="text-3xl font-bold tracking-tight leading-none font-orbitron">
//             <span className="text-[black]">IntelliCode</span>
//             <span className="text-[#6A3CB3]">AI</span>
//           </span>
//         </div>


// <ul className="flex items-center gap-6 text-lg font-light text-black">
//   <li>
//     <Link
//       to="/"
//       className="px-4 py-2 rounded-md hover:text-[#9384e6] transition-colors duration-300"
//     >
//       Home
//     </Link>
//   </li>

//   <li
//     className="relative group"
//     onMouseEnter={() => setShowFeatures(true)}
//     onMouseLeave={() => setShowFeatures(false)}
//   >
//     <button className="px-4 py-2 rounded-md hover:text-[#9384e6] transition-colors duration-300">
//       Features ▾
//     </button>
//     {showFeatures && (
//       <ul className="absolute top-12 left-0 bg-white shadow-lg rounded-md border border-gray-200 w-52 py-2 z-10">
//         <li>
//           <Link
//             to="/features/ai-review"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
//           >
//             AI Code Review
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/features/github-analysis"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
//           >
//             GitHub Auto Analysis
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/features/fix-and-commit"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
//           >
//             Fix & Commit
//           </Link>
//         </li>
//       </ul>
//     )}
//   </li>

//   <li>
//     <Link
//       to="/uploadfile"
//       className="px-4 py-2 rounded-md hover:text-[#9384e6] transition-colors duration-300"
//     >
//       Upload File
//     </Link>
//   </li>

//   <li
//     className="relative group"
//     onMouseEnter={() => setShowDocs(true)}
//     onMouseLeave={() => setShowDocs(false)}
//   >
//     <button className="px-4 py-2 rounded-md hover:text-[#9384e6] transition-colors duration-300">
//       Docs ▾
//     </button>
//     {showDocs && (
//       <ul className="absolute top-12 left-0 bg-white shadow-lg rounded-md border border-gray-200 w-48 py-2 z-10">
//         <li>
//           <Link
//             to="/docs/api"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
//           >
//             API Reference
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/docs/webhooks"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
//           >
//             Webhooks
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/docs/faqs"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
//           >
//             FAQs
//           </Link>
//         </li>
//       </ul>
//     )}
//   </li>

//   <li>
//     <Link
//       to="/pricing"
//       className="px-4 py-2 rounded-md hover:text-[#9384e6] transition-colors duration-300"
//     >
//       Pricing
//     </Link>
//   </li>

//   <li>
//     <button
//       onClick={githubLogin}
//       className="px-4 py-2 rounded-md bg-gray-100 text-gray-900 hover:bg-gray-200 transition font-semibold"
//     >
//       Login
//     </button>
//   </li>

//   <li>
//     <button
//       onClick={() => navigate("/signup")}
//       className="bg-[black] text-white px-4 py-2 rounded-4xl font-semibold hover:bg-[#9384e6] transition"
//     >
//       Start Free
//     </button>
//   </li>
// </ul>




//     </nav>
//   );
// };

// export default Navbar;








import { Link, useNavigate } from "react-router-dom";
import { githubLogin } from "../../services/authServices";
import IntelliCodeAI_3 from "../../assets/IntelliCodeAI_3.png";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Optional: Lucide icons or use SVG

const Navbar = () => {
  const [showFeatures, setShowFeatures] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer">
            <img src={IntelliCodeAI_3} alt="Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold font-orbitron">
              <span className="text-black">IntelliCode</span>
              <span className="text-[#6A3CB3]">AI</span>
            </span>
          </div>

          {/* Hamburger Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-black focus:outline-none">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6 text-base text-black">
            <li><Link to="/" className="hover:text-[#9384e6] transition">Home</Link></li>

            <li
              className="relative group"
              onMouseEnter={() => setShowFeatures(true)}
              onMouseLeave={() => setShowFeatures(false)}
            >
              <button className="hover:text-[#9384e6] transition">Features ▾</button>
              {showFeatures && (
                <ul className="absolute top-10 left-0 bg-white border rounded-md shadow-lg w-52 z-10 py-2">
                  <li><Link to="/features/ai-review" className="block px-4 py-2 hover:bg-gray-100">AI Code Review</Link></li>
                  <li><Link to="/features/github-analysis" className="block px-4 py-2 hover:bg-gray-100">GitHub Auto Analysis</Link></li>
                  <li><Link to="/features/fix-and-commit" className="block px-4 py-2 hover:bg-gray-100">Fix & Commit</Link></li>
                </ul>
              )}
            </li>

            <li><Link to="/uploadfile" className="hover:text-[#9384e6] transition">Upload File</Link></li>

            <li
              className="relative group"
              onMouseEnter={() => setShowDocs(true)}
              onMouseLeave={() => setShowDocs(false)}
            >
              <button className="hover:text-[#9384e6] transition">Docs ▾</button>
              {showDocs && (
                <ul className="absolute top-10 left-0 bg-white border rounded-md shadow-lg w-48 z-10 py-2">
                  <li><Link to="/docs/api" className="block px-4 py-2 hover:bg-gray-100">API Reference</Link></li>
                  <li><Link to="/docs/webhooks" className="block px-4 py-2 hover:bg-gray-100">Webhooks</Link></li>
                  <li><Link to="/docs/faqs" className="block px-4 py-2 hover:bg-gray-100">FAQs</Link></li>
                </ul>
              )}
            </li>

            <li><Link to="/pricing" className="hover:text-[#9384e6] transition">Pricing</Link></li>
            <li><button onClick={githubLogin} className="bg-gray-100 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200">Login</button></li>
            <li><button onClick={() => navigate("/signup")} className="bg-black text-white px-4 py-2 rounded-full hover:bg-[#9384e6]">Start Free</button></li>
          </ul>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
  <div className="md:hidden mt-4 max-h-[80vh] overflow-y-auto space-y-3 pb-4">
    <Link to="/" className="block px-4 py-2 hover:bg-gray-100 rounded" onClick={() => setMenuOpen(false)}>Home</Link>
    <Link to="/features/ai-review" className="block px-4 py-2 hover:bg-gray-100 rounded" onClick={() => setMenuOpen(false)}>AI Code Review</Link>
    <Link to="/features/github-analysis" className="block px-4 py-2 hover:bg-gray-100 rounded" onClick={() => setMenuOpen(false)}>GitHub Auto Analysis</Link>
    <Link to="/features/fix-and-commit" className="block px-4 py-2 hover:bg-gray-100 rounded" onClick={() => setMenuOpen(false)}>Fix & Commit</Link>
    <Link to="/uploadfile" className="block px-4 py-2 hover:bg-gray-100 rounded" onClick={() => setMenuOpen(false)}>Upload File</Link>
    <Link to="/docs/api" className="block px-4 py-2 hover:bg-gray-100 rounded" onClick={() => setMenuOpen(false)}>API Reference</Link>
    <Link to="/docs/webhooks" className="block px-4 py-2 hover:bg-gray-100 rounded" onClick={() => setMenuOpen(false)}>Webhooks</Link>
    <Link to="/docs/faqs" className="block px-4 py-2 hover:bg-gray-100 rounded" onClick={() => setMenuOpen(false)}>FAQs</Link>
    <Link to="/pricing" className="block px-4 py-2 hover:bg-gray-100 rounded" onClick={() => setMenuOpen(false)}>Pricing</Link>
    <button onClick={githubLogin} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">Login</button>
    <button onClick={() => { navigate("/signup"); setMenuOpen(false); }} className="block w-full text-left bg-black text-white px-4 py-2 rounded hover:bg-[#9384e6]">Start Free</button>
  </div>
)}

      </div>
    </nav>
  );
};

export default Navbar;


