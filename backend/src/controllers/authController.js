import axios from "axios";
import { URLSearchParams } from 'url';
import prisma from "../config/db.js"; // Adjust if your Prisma setup differs
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_REDIRECT_URI, GITHUB_API_URL } from "../config/github.js";

export const githubLogin = (req, res) => {
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}`;
  res.redirect(authUrl);
};

export const githubCallback = async (req, res) => {
    try {
      const { code } = req.query;
      if (!code) throw new Error("Authorization code missing");
  
      // Exchange the code for an access token
      const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });
  
      // Log the response text
      const responseBody = await response.text();
      console.log("GitHub OAuth Response:", responseBody);  // Log the response body
  
      // The response will be URL-encoded, so parse it manually
      const params = new URLSearchParams(responseBody);
      const accessToken = params.get('access_token');  // Extract access token
  
      if (!accessToken) throw new Error("Access token not found");
  
      // Fetch user data from GitHub
      const userResponse = await fetch('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const user = await userResponse.json();
  
      // Fallback email if GitHub doesn't return one
      const userEmail = user.email || `${user.login}@example.com`;
  
      // Ensure githubId is treated as a string
      const githubId = String(user.id);  // Convert githubId to string
  
      // Upsert user in the database
      const dbUser = await prisma.user.upsert({
        where: { githubId },  // Now githubId is passed as a string
        update: { username: user.login, email: userEmail },
        create: {
          githubId,
          username: user.login,
          email: userEmail,
        },
      });
  
      res.json({
        message: "Login successful",
        user: dbUser,
        accessToken,
      });
    } catch (error) {
      console.error("GitHub OAuth Error:", error);
      res.status(500).json({ message: "Failed to authenticate with GitHub", error: error.message });
    }
  };
  