// src/layouts/MainLayout.jsx
import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const HeaderLayout = () => {
  return (
    <div className=" bg-white">
      <Header />
      <div >
        <Outlet />
      </div>
    </div>
  );
};

export default HeaderLayout;
