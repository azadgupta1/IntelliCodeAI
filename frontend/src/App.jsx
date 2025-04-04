import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import GithubSuccess from "./pages/GithubSuccess";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import GithubFileAnalysis from "./pages/GithubFileAnalysis"; // ✅ Import analysis page
import AutoAnalysisStatus from "./pages/AutoAnalysisStatus";
import UploadFile from './pages/UploadFile';
import AnalysisDetails from "./pages/AnalysisDetails";
import UserProfile from "./pages/UserProfile";
import { useEffect, useState } from "react";

// Auth utility to check if user is authenticated
const isAuthenticated = () => !!localStorage.getItem("token");

// Protected Route component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/github-success" element={<GithubSuccess />} />
        <Route path="/uploadfile" element={<UploadFile />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        
        {/* ✅ Add Route for Analysis Page */}
        <Route path="/github/:owner/:repo/analyze" element={<ProtectedRoute element={<GithubFileAnalysis />} />} />
        <Route path="/auto-analysis-status" element={<ProtectedRoute element={<AutoAnalysisStatus />} />} />
        <Route path="/analysis/:id" element={<ProtectedRoute element={<AnalysisDetails />} />} />
        <Route path="/profile" element={<UserProfile element={<UserProfile />} />} />
      </Routes>
    </Router>
  );
}

export default App;
