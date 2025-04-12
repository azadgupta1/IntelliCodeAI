import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GithubSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      navigate("/organisations");
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  return <div className="text-center mt-10">Authenticating...</div>;
};

export default GithubSuccess;
