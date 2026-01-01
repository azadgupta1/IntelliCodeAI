import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Layouts
import LandingLayout from "./layouts/LandingLayout.jsx";
import HeaderLayout from "./layouts/HeaderLayout";

// Pages
import Home from "./pages/Landing/Home";
import UploadFile from "./pages/Landing/UploadFile";
import Pricing from "./pages/Landing/Pricing";
import {Signup} from "./pages/Landing/SignUp";
import GithubSuccess from "./pages/GithubSuccess";
import GithubFileAnalysis from "./pages/Repo/GithubFileAnalysis";
import AutoAnalysisStatus from "./pages/AutoAnalysisStatus";
import AnalysisDetails from "./pages/AnalysisDetails";
import Profile from "./pages/Profile";
import Organisations from "./pages/Organisations";
import GithubDashboard from "./pages/GithubDashboard";
import Dashboard from "./pages/Dashboard";
import Repositories from "./pages/Overview/Repositories";
import Policies from "./pages/Overview/Policies";
import Security from "./pages/Overview/Security";
import Settings from "./pages/Overview/Settings";
import Overview from "./pages/Overview/Overview";
import AnalysisHistory from "./components/Github/AnalysisHistory";
import RepoAnalysisPage from "./pages/Repo/RepoAnalysisPage";
import RepositoryLayout from "./layouts/RepositoryLayout";
import UserRepositories from "./components/UserRepositories";
import RepoFiles from "./components/Github/RepoFiles";
import CommitsPage from "./pages/Repo/CommitPage";
import Pulls from "./pages/Repo/Pulls";
import RepoOverview from "./pages/Repo/RepoOverview";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RepoSettings from "./pages/Repo/RepoSettings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Landing/Login.jsx";
import Docs from "./pages/Landing/Docs.jsx";
import IntelliCodeAI from "./components/Docs/IntelliCodeAI";

import Header from "./components/Header.jsx";


const queryClient = new QueryClient();

// Auth utility
const isAuthenticated = () => !!localStorage.getItem("token");

// Protected Route wrapper
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>


        {/* Public Pages under Main Layout */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Home />} />
          <Route path="uploadfile" element={<UploadFile />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>




        <Route path="/header" element={<Header />} />

        {/* Auth-related Routes */}
        
        <Route path="/github-success" element={<GithubSuccess />} />

        {/* Protected Pages under Header Layout */}
        <Route path="/" element={<ProtectedRoute><HeaderLayout /></ProtectedRoute>} >
          <Route path="organisations" element={<ProtectedRoute element={<Organisations />} />} />
          <Route path="github-dashboard" element={<ProtectedRoute element={<GithubDashboard />} />} />

          <Route path="repositories/:owner/:repo" element={<RepositoryLayout />} >
              <Route index element={<RepoOverview />} /> 
               <Route path="repooverview" element={<RepoOverview />} />
               <Route path="commits" element={<CommitsPage />} />
               <Route path="files" element={<GithubFileAnalysis />} />
               <Route path="issues" element={<RepoAnalysisPage />} />
               <Route path="pulls" element={<Pulls />} />
               <Route path="settings" element={<RepoSettings />} />
               <Route path="analysis/:id" element={<ProtectedRoute element={<AnalysisDetails />} />} />
          </Route> 







          {/* <Route path="dashboard" element={<ProtectedRoute element={<Dashboard />} />}> */}
          <Route path="dashboard/:username" element={<ProtectedRoute element={<Dashboard />} />}>
            <Route index element={<Overview />} />
            <Route path="repositories" element={<Repositories />} />
            <Route path="policies" element={<Policies />} />
            <Route path="security" element={<Security />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>



        {/* Other Protected Routes */}
        <Route path="/github/:owner/:repo/analyze" element={<ProtectedRoute element={<GithubFileAnalysis />} />} />
        <Route path="/auto-analysis-status" element={<ProtectedRoute element={<AutoAnalysisStatus />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/analysis-history" element={<ProtectedRoute element={<AnalysisHistory />} />} />
        <Route path="/analyze-manually" element={<UserRepositories />} />
        <Route path="/docs" element={<Docs />} >
            <Route index element={<IntelliCodeAI />} />
        </Route>


      </Routes>
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        pauseOnHover
        draggable={false}
      />
    </Router>
    </QueryClientProvider>
  );
}

export default App;
