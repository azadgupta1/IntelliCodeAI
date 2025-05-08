import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { fetchUserProfile } from "../services/userServices";
import {
  getUnreadNotifications,
  markNotificationsRead,
} from "../services/notificationServices";
import IntelliCodeAI_1 from "../assets/IntelliCodeAI_1.png";
import IntelliCodeAI_4 from "../assets/IntelliCodeAI_4.png";
import IntelliCodeAI_3 from "../assets/IntelliCodeAI_3.png";
import { FaBriefcase } from "react-icons/fa";
import { IoFolderOpenOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";



import { FiBell, FiChevronDown, FiHome, FiFolder } from "react-icons/fi";
import { GoGitBranch } from 'react-icons/go';
import { HiOutlineSlash } from "react-icons/hi2";

import avtar from "../assets/avtar.png";

const Header = () => {
  const [profile, setProfile] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    const getUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetchUserProfile(token);
      if (response.success) {
        setProfile(response.user);
        const notifs = await getUnreadNotifications(response.user.id);
        setNotifications(notifs);
      }
    };

    getUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleMarkAllRead = async () => {
    if (!profile) return;
    await markNotificationsRead(profile.id);
    setNotifications([]);
  };

  const renderDynamicPath = () => {
    const path = location.pathname;
    const segments = path.split("/").filter(Boolean);

    if (segments[0] === "dashboard" && segments[1]) {
      return (
        <div className="flex items-center text-sm text-white space-x-2 ml-2">
          <FaBriefcase className="text-base" />
          <span className="font-semibold text-sm"> {segments[1]}</span>
          <RiArrowDropDownLine className="text-2xl"/>
        </div>
      );
    }

    if (segments[0] === "repositories" && segments[1] && segments[2]) {
      return (
        <div className="flex items-center text-sm text-white space-x-2 ml-2">
        <FaBriefcase className="text-base" />
        <span className="font-semibold text-sm">{segments[1]}</span>
        <RiArrowDropDownLine className="text-2xl"/>
        <HiOutlineSlash className="text-xl opacity-70"  /> {/* Optional slash icon */}
        <IoFolderOpenOutline className="text-base" />
        <span className="font-semibold text-sm">{segments[2]}</span>
        <RiArrowDropDownLine className="text-2xl"/>
        <HiOutlineSlash className="text-xl opacity-70"  />
        <GoGitBranch className="text-base" />
        <span className="font-semibold text-sm">main</span>
      </div>
      );
    }

    return null;
  };

  // #F5F5F5 or #EAEAEA
  // #1A1A40 or #2C3E50
  // #161540

  return (
    <header className="dark:bg-gray-900 text-white p-2 flex justify-between items-center shadow-md">
      <div
        className="flex items-center space-x-10  cursor-pointer"
        onClick={(e) => e.preventDefault()}
      >
        <img src={IntelliCodeAI_3} alt="IntelliCodeAI" className="h-12 w-16 transform transition-transform duration-200 hover:scale-105" />
        {renderDynamicPath()}
      </div>

      <div className="flex items-center space-x-6 ml-auto mr-6">
        {/* 🔔 Notifications */}
        <div className="relative">
          <div
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="cursor-pointer flex items-center space-x-1 group"
          >
            <FiBell className="text-xl text-white" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full px-1">
                {notifications.length}
              </span>
            )}
            <FiChevronDown className="text-sm text-white transition-transform duration-200 group-hover:rotate-180" />
          </div>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white text-gray-900 shadow-md rounded-md overflow-hidden z-50">
              <div className="p-4 border-b flex justify-between items-center">
                <h4 className="font-semibold">Notifications</h4>
                <button
                  onClick={handleMarkAllRead}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Mark all as read
                </button>
              </div>
              <ul className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <li className="p-4 text-sm text-gray-500">
                    No new notifications
                  </li>
                ) : (
                  notifications.map((notif, idx) => (
                    <li
                      key={idx}
                      className="p-4 border-b hover:bg-gray-100 text-sm"
                    >
                      {notif.message || "You have a new update"}
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>

        <h4 className="cursor-pointer text-white hover:underline">Docs</h4>

        {profile && (
          <div className="relative">
            <img
              src={avtar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 shadow-md rounded-md overflow-hidden z-50">
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
