import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Layouts
import MainLayout from "./layouts/MainLayout";
import HeaderLayout from "./layouts/HeaderLayout";

// Pages
import Home from "./pages/Home";
import UploadFile from "./pages/UploadFile";
import Pricing from "./pages/Pricing";
import {Signup} from "./pages/SignUp";
import GithubSuccess from "./pages/GithubSuccess";
import GithubFileAnalysis from "./pages/GithubFileAnalysis";
import AutoAnalysisStatus from "./pages/AutoAnalysisStatus";
import AnalysisDetails from "./pages/AnalysisDetails";
import UserProfile from "./pages/UserProfile";
import Organisations from "./pages/Organisations";
import GithubDashboard from "./pages/GithubDashboard";
import Dashboard from "./pages/Dashboard";
import Repositories from "./pages/Repositories";
import Policies from "./pages/Policies";
import Security from "./pages/Security";
import Settings from "./pages/Settings";
import Overview from "./pages/Overview";
import AnalysisHistory from "./components/Github/AnalysisHistory";
import RepoAnalysisPage from "./pages/RepoAnalysisPage";
import RepositoryLayout from "./layouts/RepositoryLayout";
import UserRepositories from "./components/UserRepositories";
import RepoFiles from "./components/Github/RepoFiles";
import CommitsPage from "./pages/CommitPage";
import Pulls from "./pages/Pulls";

// Auth utility
const isAuthenticated = () => !!localStorage.getItem("token");

// Protected Route wrapper
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages under Main Layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="uploadfile" element={<UploadFile />} />
          <Route path="pricing" element={<Pricing />} />
        </Route>

        {/* Auth-related Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/github-success" element={<GithubSuccess />} />

        {/* Protected Pages under Header Layout */}
        <Route path="/" element={<HeaderLayout />}>
          <Route path="organisations" element={<ProtectedRoute element={<Organisations />} />} />
          <Route path="github-dashboard" element={<ProtectedRoute element={<GithubDashboard />} />} />
          <Route path="repositories/:owner/:repo" element={<RepositoryLayout />} >
              <Route index element={<Overview />} /> {/* <-- default route */}
              <Route path="overview" element={<Overview />} />
               <Route path="commits" element={<CommitsPage />} />
               <Route path="files" element={<GithubFileAnalysis />} />
               <Route path="issues" element={<RepoAnalysisPage />} />
               <Route path="pulls" element={<Pulls />} />
               <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="dashboard" element={<ProtectedRoute element={<Dashboard />} />}>
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
        <Route path="/profile" element={<ProtectedRoute element={<UserProfile />} />} />
        <Route path="/analysis/:id" element={<ProtectedRoute element={<AnalysisDetails />} />} />
        <Route path="/analysis-history" element={<ProtectedRoute element={<AnalysisHistory />} />} />
        <Route path="/analyze-manually" element={<UserRepositories />} />
      </Routes>
    </Router>
  );
}

export default App;




















































// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// import MainLayout from "./layouts/MainLayout";
// import GithubSuccess from "./pages/GithubSuccess";
// import Home from "./pages/Home";
// import GithubFileAnalysis from "./pages/GithubFileAnalysis";
// import AutoAnalysisStatus from "./pages/AutoAnalysisStatus";
// import UploadFile from './pages/UploadFile';
// import AnalysisDetails from "./pages/AnalysisDetails";
// import UserProfile from "./pages/UserProfile";
// import Pricing from "./pages/Pricing";
// import { Signup } from "./pages/SignUp";
// import GithubDashboard from "./pages/GithubDashboard";
// import Organisations from "./pages/Organisations";
// import HeaderLayout from "./layouts/HeaderLayout";
// import Dashboard from "./pages/Dashboard";
// import Repositories from "./pages/Repositories";
// import Policies from "./pages/Policies";
// import Security from "./pages/Security";
// import Settings from "./pages/Settings";


// // Auth utility
// const isAuthenticated = () => !!localStorage.getItem("token");

// // Protected Route wrapper
// const ProtectedRoute = ({ element }) => {
//   return isAuthenticated() ? element : <Navigate to="/" />;
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Routes that use MainLayout with Navbar */}
//         <Route path="/" element={<MainLayout />}>
//           <Route index element={<Home />} />
//           <Route path="uploadfile" element={<UploadFile />} />
//           <Route path="pricing" element={<Pricing />} />
//         </Route>

//         {/* <Route path="/dashboard" element={<Dashboard />}>
//           <Route index element={<GithubDashboard />} />
//           {/* <Route path="repositories" element={<Repositories />} /> */}
//           {/* <Route path="policies" element={<Policies />} />
//           <Route path="security" element={<Security />} />
//           <Route path="settings" element={<Settings />} /> */}
//         {/* </Route> */} 

//         <Route path="/" element={<HeaderLayout />}>
//           <Route index element={<Organisations />} />
//           <Route path="github-dashboard" element={<GithubDashboard />} />

//           <Route path="/dashboard" element={<Dashboard />}>
//           <Route index element={<GithubDashboard />} />
//           <Route path="repositories" element={<Repositories />} />
//           <Route path="policies" element={<Policies />} />
//           <Route path="security" element={<Security />} />
//           <Route path="settings" element={<Settings />} />
//         </Route>
          

//           {/* add more child routes here */}
//         </Route>

//         {/* Routes that don't use MainLayout */}
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/organisations" element={<ProtectedRoute element={<Organisations />} />} />
//         <Route path="/github-success" element={<GithubSuccess />} />
//         <Route path="/github/:owner/:repo/analyze" element={<ProtectedRoute element={<GithubFileAnalysis />} />} />
//         <Route path="/auto-analysis-status" element={<ProtectedRoute element={<AutoAnalysisStatus />} />} />
//         <Route path="/profile" element={<ProtectedRoute element={<UserProfile />} />} />
//         <Route path="/analysis/:id" element={<ProtectedRoute element={<AnalysisDetails />} />} />
//         {/* <Route path="/github-dashboard" element={<ProtectedRoute element={<GithubDashboard />} /> } /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
