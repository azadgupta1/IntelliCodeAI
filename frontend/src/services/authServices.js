import { API_BASE_URL } from "./githubServices";


export const githubLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/github/login`;
  };
  

  // "http://localhost:3000/auth/github/login";