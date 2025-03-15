import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/Home';
import Dashboard from './pages/Dashboard';
import UploadFile from './pages/UploadFile';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/uploadfile" element={<UploadFile />} />
      </Routes>
    </Router>
  );
}

export default App;
