import React, { useState, useEffect } from "react";
import AnalysisHistory from "../components/Github/AnalysisHistory";
import UserRepositories from "../components/UserRepositories";
import AutoAnalysisStatus from "./AutoAnalysisStatus";
import Header from "../components/Header";
import { FaHistory, FaFolderOpen, FaRobot } from "react-icons/fa";

const GithubDashboard = () => {
  const [token, setToken] = useState(null);
  const [activeTab, setActiveTab] = useState("analysis");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "analysis":
        return <AnalysisHistory token={token} />;
      case "repos":
        return <UserRepositories token={token} />;
      case "auto":
        return <AutoAnalysisStatus token={token} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      {/* Full-width Header */}
      {/* <Header /> */}

      {/* Sidebar + Main Content Layout */}
      <div className="flex h-[calc(100vh-64px)]"> {/* Adjust height assuming header is ~64px */}
        {/* Sidebar */}
        <div className="w-20 sm:w-56 bg-gray-800 text-white flex flex-col items-center sm:items-start py-6">
          <h2 className="text-lg font-bold px-4 hidden sm:block mb-6">GitHub</h2>
          <button
            className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-700 ${activeTab === "analysis" ? "bg-gray-700" : ""}`}
            onClick={() => setActiveTab("analysis")}
          >
            <FaHistory /> <span className="hidden sm:inline">Analysis History</span>
          </button>
          <button
            className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-700 ${activeTab === "repos" ? "bg-gray-700" : ""}`}
            onClick={() => setActiveTab("repos")}
          >
            <FaFolderOpen /> <span className="hidden sm:inline">Repositories</span>
          </button>
          <button
            className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-700 ${activeTab === "auto" ? "bg-gray-700" : ""}`}
            onClick={() => setActiveTab("auto")}
          >
            <FaRobot /> <span className="hidden sm:inline">Auto Analysis</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">GitHub Dashboard</h1>
          {!token ? (
            <p className="text-red-500">Please log in with GitHub.</p>
          ) : (
            renderContent()
          )}
        </div>
      </div>
    </div>
  );
};

export default GithubDashboard;
