import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GitHubCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const username = params.get("username");

        if (token) {
            // Store token in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("username", username);

            // Redirect to Dashboard
            navigate("/dashboard");
        } else {
            console.error("GitHub login failed");
            navigate("/");
        }
    }, [navigate]);

    return <h2>Authenticating with GitHub...</h2>;
};

export default GitHubCallback;
