// import React, { useState, useEffect } from "react";
// import { fetchProfile } from "../services/api";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const tokenFromUrl = urlParams.get("token");
  
//     if (tokenFromUrl) {
//       localStorage.setItem("token", tokenFromUrl);
//       window.history.replaceState({}, document.title, "/profile");
//     }
  
//     const getProfile = async () => {
//       try {
//         const data = await fetchProfile(tokenFromUrl || token);
//         setUser(data.user);
//       } catch (error) {
//         console.error("Failed to fetch profile:", error);
//       }
//     };
  
//     getProfile();
//   }, [token]);
  

//   return (
//     <div className="container mx-auto mt-10 p-6">
//       <h2 className="text-3xl font-bold mb-6">User Profile</h2>
//       <p className="text-gray-700 mb-2"><strong>Username:</strong> {user.username}</p>
//       <p className="text-gray-700 mb-2"><strong>Email:</strong> {user.email}</p>
//       <p className="text-gray-700 mb-2"><strong>GitHub ID:</strong> {user.githubId}</p>
//       <button
//         onClick={() => localStorage.removeItem("token")}
//         className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Profile;



