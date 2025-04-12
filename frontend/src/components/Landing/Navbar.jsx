
import { Link, useNavigate } from "react-router-dom";
import { githubLogin } from "../../services/authServices";
import IntelliCodeAI_1 from "../../assets/IntelliCodeAI_1.png";
import { useState } from "react";

const Navbar = () => {
  const [showFeatures, setShowFeatures] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const navigate = useNavigate();

  return (
    // <nav className="bg-black text-white px-10 py-1 shadow-md  flex items-center justify-between relative z-50">
    <nav className="fixed top-0 left-0 w-full bg-black text-white px-10 py-1 shadow-md flex items-center justify-between z-50">

      {/* Logo + Name */}
      <div
        className="flex items-center space-x-0 transform transition-transform duration-200 hover:scale-105 cursor-pointer"
        onClick={(e) => e.preventDefault()}
      >
        <img
          src={IntelliCodeAI_1}
          alt="IntelliCodeAI"
          className="h-15 w-15"
        />
        <span
          className="text-2xl font-extrabold tracking-wider"
          style={{
            color: "white",
            fontFamily: "'Orbitron', sans-serif",
            letterSpacing: "0.025em"
          }}
        >
          IntelliCode<span style={{ color: "#00ffd1" }}>AI</span>
        </span>
      </div>


      {/* Centered Nav Links */}
      <ul className="flex items-center space-x-4 text-md font-medium relative">
        <li className="group relative">
          <Link
            to="/"
            className="px-4 py-2 rounded-md transition duration-300 group-hover:bg-white/10"
          >
            Home
          </Link>
        </li>

        <li
          className="group relative"
          onMouseEnter={() => setShowFeatures(true)}
          onMouseLeave={() => setShowFeatures(false)}
        >
          <button className="px-4 py-2 rounded-md transition duration-300 group-hover:bg-white/10">
            Features ▾
          </button>
          {showFeatures && (
            <ul className="absolute top-12 left-0 bg-black/80 backdrop-blur-sm text-sm rounded-md w-48 py-2 space-y-2 border border-white/10">
              <li className="px-4 hover:bg-white/10">
                <Link to="/features/ai-review">AI Code Review</Link>
              </li>
              <li className="px-4 hover:bg-white/10">
                <Link to="/features/github-analysis">GitHub Auto Analysis</Link>
              </li>
              <li className="px-4 hover:bg-white/10">
                <Link to="/features/fix-and-commit">Fix & Commit</Link>
              </li>
            </ul>
          )}
        </li>

        <li className="group relative">
          <Link
            to="/uploadfile"
            className="px-4 py-2 rounded-md transition duration-300 group-hover:bg-white/10"
          >
            Upload File
          </Link>
        </li>

        <li
          className="group relative"
          onMouseEnter={() => setShowDocs(true)}
          onMouseLeave={() => setShowDocs(false)}
        >
          <button className="px-4 py-2 rounded-md transition duration-300 group-hover:bg-white/10">
            Docs ▾
          </button>
          {showDocs && (
            <ul className="absolute top-12 left-0 bg-black/80 backdrop-blur-sm text-sm rounded-md w-44 py-2 space-y-2 border border-white/10">
              <li className="px-4 hover:bg-white/10">
                <Link to="/docs/api">API Reference</Link>
              </li>
              <li className="px-4 hover:bg-white/10">
                <Link to="/docs/webhooks">Webhooks</Link>
              </li>
              <li className="px-4 hover:bg-white/10">
                <Link to="/docs/faqs">FAQs</Link>
              </li>
            </ul>
          )}
        </li>

        <li className="group relative">
          <Link
            to="/pricing"
            className="px-4 py-2 rounded-md transition duration-300 group-hover:bg-white/10"
          >
            Pricing
          </Link>
        </li>

        <li className="group relative">
          <button
            onClick={githubLogin}
            className="px-4 py-2 rounded-md font-semibold text-white bg-white/10 hover:bg-white/20 transition duration-300"
          >
            Login
          </button>
        </li>



        <li className="px-15">
          <button
            onClick={() => navigate("/signup")}
            className="bg-[#00ffd1] text-black px-4 py-2 rounded-md font-semibold hover:bg-[#00e6b8] transition duration-300"
          >
            GitHub Analysis
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

