import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../services/userServices";

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
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">IntelliCodeAI</h1>

      {profile && (
        <div className="relative">
          <img
            src={profile.avatarUrl || "/default-avatar.png"}
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
    </header>
  );
};

export default Header;
