import axios from "axios";
import prisma from "../config/db.js";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_REDIRECT_URI } from "../config/github.js";
import { generateToken } from "../utils/jwt.js";

export const githubLogin = (req, res) => {
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&scope=repo,admin:repo_hook,user:email`;
  res.redirect(authUrl);
};

export const githubCallback = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) return res.status(400).json({ message: "Authorization code missing" });

    // Exchange code for access token
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const accessToken = new URLSearchParams(response.data).get("access_token");
    if (!accessToken) throw new Error("Access token not found");

    // Fetch GitHub user data
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const user = userResponse.data;

    // Fetch GitHub email separately (if email is private)
    let userEmail = user.email;
    if (!userEmail) {
      const emailResponse = await axios.get("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const primaryEmail = emailResponse.data.find((email) => email.primary && email.verified);
      userEmail = primaryEmail ? primaryEmail.email : `${user.login}@example.com`;
    }

    // Save or update user in the database
    const dbUser = await prisma.user.upsert({
      where: { githubId: user.id.toString() },
      update: { username: user.login, email: userEmail, githubAccessToken: accessToken, avatarUrl: user.avatar_url, },
      create: { githubId: user.id.toString(), username: user.login, email: userEmail, githubAccessToken: accessToken, avatarUrl: user.avatar_url, },
    });

    // Generate a JWT token with accessToken
    const token = generateToken({ id: dbUser.id, username: dbUser.username }, accessToken);

    console.log("Final JWT Sent to Frontend:", token); // Debugging log

    // Redirect frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/github-success?token=${token}`);

  } catch (error) {
    console.error("GitHub OAuth Error:", error);
    res.status(500).json({ message: "GitHub authentication failed", error: error.message });
  }
};