import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../services/userServices";
import IntelliCodeAI_1 from "../assets/IntelliCodeAI_1.png";
import { FiBell, FiChevronDown } from "react-icons/fi";
import avtar from "../assets/avtar.png";


const Header = () => {
  const [profile, setProfile] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetchUserProfile(token);
      if (response.success) {
        setProfile(response.user);
      }
    };

    getUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="bg-black text-white p-2 flex justify-between items-center shadow-md">

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

      


      <div className="flex items-center space-x-6 ml-auto mr-6">
      <div className="relative cursor-pointer flex items-center space-x-1 group">
        <FiBell className="text-xl" />
        <FiChevronDown className="text-sm transition-transform duration-200 group-hover:rotate-180" />
      </div>

        <h4 className="cursor-pointer hover:underline">Docs</h4>
        
        {profile && (
          <div className="relative">
            <img
              src={avtar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 shadow-md rounded-md overflow-hidden">
                <div className="p-4 border-b">
                  <p className="font-semibold">@{profile.username}</p>
                  <p className="text-sm text-gray-600">{profile.email}</p>
                </div>

                <button
                  onClick={() => navigate("/profile")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  ✏ Edit Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200"
                >
                  🔐 Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

    </header>
  );
};

export default Header;
