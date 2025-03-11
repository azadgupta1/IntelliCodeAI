import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("authToken", token); // Store JWT token
      navigate("/dashboard", { replace: true }); // Remove token from URL
    }
  }, [navigate]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
      <p>You're logged in with GitHub OAuth.</p>
    </div>
  );
};

export default Dashboard;
