import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FaGithub } from "react-icons/fa";
import { fetchUserProfile } from "../services/userServices";
import ChatBot from "../components/Chatbot";

const Organisations = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetchUserProfile(token);
      console.log(response);
      if (response.success) {
        setProfile(response.user);
      }
    };

    getUserProfile();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black relative">
      {/* <Header /> */}

      <div className="max-w-3xl mx-auto mt-10 p-4">
        <h1 className="text-2xl font-bold mb-6">Organisations</h1>

        <div className="flex items-center space-x-3 mb-6">
          <FaGithub className="text-xl text-black" />
          <h2 className="text-xl font-semibold">GitHub</h2>
        </div>

        {profile && (
          <div
            onClick={() => navigate(`/dashboard/${profile.username}`)}
            className="cursor-pointer w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <img
                src={profile.avatarUrl || "/default-avatar.png"}
                alt="GitHub Avatar"
                className="w-16 h-16 rounded-full border-white"
              />
              <div>
                <p className="font-semibold">
                  {profile.username || "Unknown User"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ChatBot Component */}
      <ChatBot />
    </div>
  );
};

export default Organisations;
