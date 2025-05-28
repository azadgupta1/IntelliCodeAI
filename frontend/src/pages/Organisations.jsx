// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import { FaGithub } from "react-icons/fa";
// import { fetchUserProfile } from "../services/userServices";

// const Organisations = () => {
//   const [profile, setProfile] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getUserProfile = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const response = await fetchUserProfile(token);
//       if (response.success) {
//         setProfile(response.user);
//       }
//     };

//     getUserProfile();
//   }, []);

//   return (
//     <div className="min-h-screen bg-white text-black">
//       <Header />

//       <div className="max-w-3xl mx-auto mt-10 p-4">
//         {/* Heading */}
//         <h1 className="text-2xl font-bold mb-6">Organisations</h1>

//         {/* GitHub Section Title */}
//         <div className="flex items-center space-x-3 mb-6">
//           <FaGithub className="text-xl text-black" />
//           <h2 className="text-xl font-semibold">GitHub</h2>
//         </div>

        
//           {/* GitHub Card */}
//           {profile && (
//             <div
//               onClick={() => navigate("/github-dashboard")}
//               className="cursor-pointer w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
//             >
//               <div className="flex items-center space-x-4">
//                 {/* Avatar */}
//                 <img
//                   src={profile.avatarUrl || "/default-avatar.png"}
//                   alt="GitHub Avatar"
//                   className="w-16 h-16 rounded-full border-white"
//                 />

//                 {/* GitHub ID */}
//                 <div>
//                   <p className="font-semibold">{profile.username || "Unknown User"}</p>
//                 </div>
//               </div>
//             </div>
//           )}


//       </div>
//     </div>
//   );
// };

// export default Organisations;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import { FaGithub, FaCommentDots } from "react-icons/fa";
// import { fetchUserProfile } from "../services/userServices";

// const Organisations = () => {
//   const [profile, setProfile] = useState(null);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getUserProfile = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const response = await fetchUserProfile(token);

//       console.log(response);
//       if (response.success) {
//         setProfile(response.user);
//       }
//     };

//     getUserProfile();
//   }, []);

//   return (
//     <div className="min-h-screen bg-white text-black relative">
//       {/* <Header /> */}

//       <div className="max-w-3xl mx-auto mt-10 p-4">
//         <h1 className="text-2xl font-bold mb-6">Organisations</h1>

//         <div className="flex items-center space-x-3 mb-6">
//           <FaGithub className="text-xl text-black" />
//           <h2 className="text-xl font-semibold">GitHub</h2>
//         </div>

//         {profile && (
//           <div
//             // onClick={() => navigate("/dashboard")}
//             onClick={() => navigate(`/dashboard/${profile.username}`)}
//             className="cursor-pointer w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
//           >
//             <div className="flex items-center space-x-4">
//               <img
//                 src={profile.avatarUrl || "/default-avatar.png"}
//                 alt="GitHub Avatar"
//                 className="w-16 h-16 rounded-full border-white"
//               />
//               <div>
//                 <p className="font-semibold">
//                   {profile.username || "Unknown User"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* 🟡 Floating Chatbot Icon */}
//       <button
//         onClick={() => setIsChatOpen((prev) => !prev)}
//         className="fixed bottom-6 right-6 dark:bg-gray-900 text-white p-4 rounded-full shadow-lg hover:dark:bg-gray-900 transition-all z-50"
//       >
//         <FaCommentDots size={24} />
//       </button>

//       {/* 🟢 Chatbox UI */}
//       {isChatOpen && (
//         <div className="fixed bottom-20 right-6 w-80 bg-white border border-gray-300 rounded-xl shadow-lg z-50">
//           <div className="p-4 border-b font-semibold dark:bg-gray-900 text-white rounded-t-xl">
//             AI Chat Assistant
//           </div>
//           <div className="p-4 h-64 overflow-y-auto">
//             <p className="text-sm text-gray-600">Hi there! How can I help you today?</p>
//             {/* Later: Append messages and add Gemini API response here */}
//           </div>
//           <div className="p-2 border-t">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Organisations;




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FaGithub } from "react-icons/fa";
import { fetchUserProfile } from "../services/userServices";
import ChatBot from "../components/Chatbot";

const Organisations = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetchUserProfile(token);
      console.log(response);
      if (response.success) {
        setProfile(response.user);
      }
    };

    getUserProfile();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black relative">
      {/* <Header /> */}

      <div className="max-w-3xl mx-auto mt-10 p-4">
        <h1 className="text-2xl font-bold mb-6">Organisations</h1>

        <div className="flex items-center space-x-3 mb-6">
          <FaGithub className="text-xl text-black" />
          <h2 className="text-xl font-semibold">GitHub</h2>
        </div>

        {profile && (
          <div
            onClick={() => navigate(`/dashboard/${profile.username}`)}
            className="cursor-pointer w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <img
                src={profile.avatarUrl || "/default-avatar.png"}
                alt="GitHub Avatar"
                className="w-16 h-16 rounded-full border-white"
              />
              <div>
                <p className="font-semibold">
                  {profile.username || "Unknown User"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ChatBot Component */}
      <ChatBot />
    </div>
  );
};

export default Organisations;
