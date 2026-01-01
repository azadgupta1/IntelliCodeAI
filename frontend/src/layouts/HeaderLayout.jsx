// // src/layouts/MainLayout.jsx
// import React from "react";
// import Header from "../components/Header";
// import { Outlet } from "react-router-dom";

// const HeaderLayout = () => {
//   return (
//     <div className=" bg-white">
//       <Header />
//       <div >
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default HeaderLayout;


import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import ChatBot from "../pages/Organisations/Chatbot";

const HeaderLayout = () => {
  return (
    <div className="bg-white">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />

        <ChatBot />
      </div>

      {/* Content below the header */}
      <div className="pt-16"> {/* Adjust pt-16 to match your Header height */}
        <Outlet />
      </div>
    </div>
  );
};

export default HeaderLayout;
