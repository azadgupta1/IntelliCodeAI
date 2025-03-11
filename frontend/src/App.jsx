// import React from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router'
// import LandingPage from './pages/LandingPage'

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//       </Routes>
//     </Router>
//   )
// }

// export default App


// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
// import UploadFile from "./pages/UploadFile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/uploadfile" element={<UploadFile />} /> */}
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
