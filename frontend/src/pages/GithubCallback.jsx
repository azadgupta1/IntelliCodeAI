import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axiosConfig";

const GitHubCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const query = new URLSearchParams(window.location.search);
      const code = query.get("code");

      if (!code) {
        console.error("GitHub OAuth code missing");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`/auth/github/callback?code=${code}`);
        const { token, user } = response.data;

        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/dashboard"); // Redirect to Dashboard
      } catch (error) {
        console.error("GitHub OAuth Error:", error.response?.data || error.message);
        navigate("/login");
      }
    };

    fetchToken();
  }, [navigate]);

  return <div className="text-center text-lg mt-10">Logging you in...</div>;
};

export default GitHubCallback;
































// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const GitHubCallback = () => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         const params = new URLSearchParams(window.location.search);
//         const token = params.get("token");
//         const username = params.get("username");

//         if (token) {
//             // Store token in localStorage
//             localStorage.setItem("token", token);
//             localStorage.setItem("username", username);

//             // Redirect to Dashboard
//             navigate("/dashboard");
//         } else {
//             console.error("GitHub login failed");
//             navigate("/");
//         }
//     }, [navigate]);

//     return <h2>Authenticating with GitHub...</h2>;
// };

// export default GitHubCallback;


// import { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// const GitHubCallback = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const fetchGitHubUser = async () => {
//       const queryParams = new URLSearchParams(location.search);
//       const code = queryParams.get("code");

//       console.log("GitHub Code:", code); // Debugging step 1

//       if (code) {
//         try {
//           const response = await axios.get(`http://localhost:5000/auth/github/callback?code=${code}`);
          
//           console.log("Backend Response:", response.data); // Debugging step 2

//           if (response.data.token) {
//             localStorage.setItem("authToken", response.data.token);
//             navigate("/dashboard");
//           } else {
//             console.log("No token received. Redirecting to home.");
//             navigate("/");
//           }
//         } catch (error) {
//           console.error("GitHub OAuth Error:", error);
//           navigate("/");
//         }
//       } else {
//         console.log("No GitHub Code found in URL.");
//         navigate("/");
//       }
//     };

//     fetchGitHubUser();
//   }, [location, navigate]);

//   return <h2>Logging in with GitHub...</h2>;
// };

// export default GitHubCallback;
