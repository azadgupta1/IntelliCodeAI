// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { useCookies } from 'react-cookie';

// const Dashboard = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [cookies, setCookie, removeCookie] = useCookies(['token']);
//     const [userData, setUserData] = useState(null);

//     useEffect(() => {
//         const tokenFromQuery = new URLSearchParams(location.search).get('token');
//         const storedToken = cookies.token || tokenFromQuery;

//         if (!storedToken) {
//             navigate('/login');
//             return;
//         }

//         if (tokenFromQuery) {
//             setCookie('token', tokenFromQuery, { path: '/' });
//             window.history.replaceState({}, document.title, "/dashboard");
//         }

//         const fetchUserData = async () => {
//           try {
//               const response = await axios.get('/protected/user', {
//                   headers: { Authorization: `Bearer ${storedToken}` },
//               });
//               console.log('Response:', response); // Add this line
//               setUserData(response.data.user);
//           } catch (error) {
//               console.error('Failed to fetch user data:', error); // Keep this line
//               console.log("error response", error.response); //add this line.
//               removeCookie('token', { path: '/' });
//               navigate('/login');
//           }
//       };

//         fetchUserData();
//     }, [navigate, location.search, cookies.token, setCookie, removeCookie]);

//     if (!userData) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold">Dashboard</h1>
//             <p>Welcome, {userData.username}!</p>
//             {/* Add your dashboard content here */}
//         </div>
//     );
// };

// export default Dashboard;


import React from 'react'

function Dashboard() {
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard