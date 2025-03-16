// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from './pages/Home';
// import Dashboard from './pages/Dashboard';
// import UploadFile from './pages/UploadFile';
// import ProtectedRoute from "./components/ProtectedRoute";
// import { AuthProvider } from "./hooks/useAuth.jsx";


// function App() {
//   return (
//     <AuthProvider>
//     <Router>
//       {/* <Navbar /> */}
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         {/* <Route path="/dashboard" element={<Dashboard />} /> */}
//         <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//         <Route path="/uploadfile" element={<UploadFile />} />
//       </Routes>
//     </Router>
//     </AuthProvider>
//   );
// }

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from './pages/Home';
// import Dashboard from './pages/Dashboard';
// import UploadFile from './pages/UploadFile';
// import Login from "./pages/Login"
// import { CookiesProvider } from 'react-cookie'; // Import CookiesProvider

// function App() {
//     return (
//         <CookiesProvider> {/* Wrap Router with CookiesProvider */}
//             <Router>
//                 <Routes>
//                     <Route path="/" element={<HomePage />} />
//                     <Route path="/dashboard" element={<Dashboard />} />
//                     <Route path="/uploadfile" element={<UploadFile />} />
//                     <Route path="/login" element={<Login />} />
//                 </Routes>
//             </Router>
//         </CookiesProvider>
//     );
// }

// export default App;



// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import GithubSuccess from "./pages/GithubSuccess";
// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/github-success" element={<GithubSuccess />} />
//         <Route path="/dashboard" element={<Dashboard />} />

//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import GithubSuccess from "./pages/GithubSuccess";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
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
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      </Routes>
    </Router>
  );
}

export default App;
