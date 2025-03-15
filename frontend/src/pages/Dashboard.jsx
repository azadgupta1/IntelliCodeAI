import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the token from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Store the token in localStorage
      localStorage.setItem("token", token);
      // Clear the URL to keep it clean
      window.history.replaceState({}, document.title, "/dashboard");
    } else {
      // Check if already logged in
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        navigate("/"); // Redirect to home if no token found
      }
    }
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>Your login was successful!</p>
    </div>
  );
};

export default Dashboard;
