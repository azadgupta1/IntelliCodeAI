import { Link, useNavigate } from "react-router-dom";
import { githubLogin } from "../../services/authServices";
import IntelliCodeAI_3 from "../../assets/IntelliCodeAI_3.png";
import NewIA from "../../assets/NewIA.png";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Optional: Lucide icons or use SVG


const Navbar = () => {
  const [showFeatures, setShowFeatures] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const loginpage = () =>{
    navigate('/loginpage');
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-950 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src={NewIA}
              alt="Logo"
              className="h-10 sm:h-12 md:h-14 w-auto"
            />
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold font-orbitron">
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
          <ul className="hidden md:flex items-center gap-6 text-lg text-black">
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
                  <li><Link to="/docs" className="block px-4 py-2 hover:bg-gray-100">API Reference</Link></li>
                  <li><Link to="/docs/webhooks" className="block px-4 py-2 hover:bg-gray-100">Webhooks</Link></li>
                  <li><Link to="/docs/faqs" className="block px-4 py-2 hover:bg-gray-100">FAQs</Link></li>
                </ul>
              )}
            </li>

            <li><Link to="/pricing" className="hover:text-[#9384e6] transition">Pricing</Link></li>
            </ul>
            <ul className="hidden md:flex items-center gap-6 text-lg text-black  space-x-2">
              <li><button onClick={loginpage} className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-200">Login</button></li>
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
    <button onClick={loginpage} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">Login</button>
    <button onClick={() => { navigate("/signup"); setMenuOpen(false); }} className="block w-full text-left bg-black text-white px-4 py-2 rounded hover:bg-[#9384e6]">Start Free</button>
  </div>
)}

      </div>
    </nav>
  );
};

export default Navbar;


