import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Layouts
import MainLayout from "./layouts/MainLayout";
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
import Login from "./components/Landing/Login";
import Docs from "./pages/Docs";
import IntelliCodeAI from "./components/Docs/IntelliCodeAI";



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
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="uploadfile" element={<UploadFile />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="loginpage" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        {/* Auth-related Routes */}
        
        <Route path="/github-success" element={<GithubSuccess />} />

        {/* Protected Pages under Header Layout */}
        <Route path="/" element={<HeaderLayout />}>
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
                
               {/* <Route path="issues" element={<RepoAnalysisPage />}>
                <Route path="analysis/:id" element={<ProtectedRoute element={<AnalysisDetails />} />} />
              </Route> */}
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
        {/* <Route path="analysis/:id" element={<ProtectedRoute element={<AnalysisDetails />} />} /> */}
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




















































// {
//   "name": "frontend",
//   "private": true,
//   "version": "0.0.0",
//   "type": "module",
//   "scripts": {
//     "dev": "vite",
//     "build": "vite build",
//     "lint": "eslint .",
//     "preview": "vite preview"
//   },
//   "dependencies": {
//     "@headlessui/react": "^2.2.1",
//     "@monaco-editor/react": "^4.7.0",
//     "@react-three/drei": "^10.0.7",
//     "@react-three/fiber": "^9.1.2",
//     "@shadcn/ui": "^0.0.4",
//     "@tailwindcss/vite": "^4.0.12",
//     "@tanstack/react-query": "^5.75.0",
//     "axios": "^1.8.3",
//     "date-fns": "^4.1.0",
//     "dom": "^0.0.3",
//     "dotenv": "^16.5.0",
//     "framer": "^2.4.1",
//     "framer-motion": "^10.13.1",
//     "lucide-react": "^0.488.0",
//     "moment": "^2.30.1",
//     "motion": "^12.10.5",
//     "react": "^18.2.0",
//     "react-cookie": "^8.0.0",
//     "react-diff-viewer": "^3.1.1",
//     "react-dom": "^18.2.0",
//     "react-icons": "^5.5.0",
//     "react-router": "^7.3.0",
//     "react-router-dom": "^7.3.0",
//     "react-syntax-highlighter": "^15.6.1",
//     "react-toastify": "^11.0.5",
//     "recharts": "^2.15.3",
//     "tailwindcss": "^4.0.12",
//     "three": "^0.176.0"
//   },
//   "devDependencies": {
//     "@eslint/js": "^9.21.0",
//     "@types/react": "^19.0.10",
//     "@types/react-dom": "^19.0.4",
//     "@vitejs/plugin-react": "^4.3.4",
//     "eslint": "^9.21.0",
//     "eslint-plugin-react-hooks": "^5.1.0",
//     "eslint-plugin-react-refresh": "^0.4.19",
//     "globals": "^15.15.0",
//     "vite": "^6.2.0"
//   }
// }











// postgresql://neondb_owner:npg_Ht93SYaUVieq@ep-noisy-hill-a1xp21qr-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require