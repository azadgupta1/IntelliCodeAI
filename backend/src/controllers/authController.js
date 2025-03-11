import axios from "axios";
import { URLSearchParams } from "url";
import prisma from "../config/db.js"; // Adjust if your Prisma setup differs
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_REDIRECT_URI } from "../config/github.js";
import { generateToken } from "../utils/jwt.js";

export const githubLogin = (req, res) => {
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}`;
  res.redirect(authUrl);
};

export const githubCallback = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) throw new Error("Authorization code missing");

    // Exchange the code for an access token
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const params = new URLSearchParams(response.data);
    const accessToken = params.get("access_token");

    if (!accessToken) throw new Error("Access token not found");

    // Fetch the user data from GitHub
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const user = userResponse.data;
    const userEmail = user.email || `${user.login}@example.com`;

    // Save or update user in the database, including the access token
    const dbUser = await prisma.user.upsert({
      where: { githubId: user.id.toString() },
      update: {
        username: user.login,
        email: userEmail,
        githubAccessToken: accessToken, // Update the access token
      },
      create: {
        githubId: user.id.toString(),
        username: user.login,
        email: userEmail,
        githubAccessToken: accessToken, // Save the access token
      },
    });

    // Generate a JWT token with the GitHub access token
    const token = generateToken(
      { id: dbUser.id, username: dbUser.username },
      accessToken // Pass the GitHub access token
    );

    // res.json({
    //   message: "Login successful",
    //   user: dbUser,
    //   token,
    // });
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
  } catch (error) {
    console.error("GitHub OAuth Error:", error);
    res.status(500).json({
      message: "Failed to authenticate with GitHub",
      error: error.message,
    });
  }
};






// export const githubCallback = async (req, res) => {
//   try {
//     const { code } = req.query;
//     if (!code) throw new Error("Authorization code missing");

//     // Exchange the code for an access token
//     const response = await axios.post(
//       "https://github.com/login/oauth/access_token",
//       {
//         client_id: GITHUB_CLIENT_ID,
//         client_secret: GITHUB_CLIENT_SECRET,
//         code,
//       },
//       {
//         headers: { "Content-Type": "application/json" },
//       }
//     );

//     // Extract access token from response
//     const params = new URLSearchParams(response.data);
//     const accessToken = params.get("access_token");

//     if (!accessToken) throw new Error("Access token not found");

//     // Fetch the user data from GitHub
//     const userResponse = await axios.get("https://api.github.com/user", {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     const user = userResponse.data;
//     const userEmail = user.email || `${user.login}@example.com`;

//     // Save or update user in the database, including the access token
//     const dbUser = await prisma.user.upsert({
//       where: { githubId: user.id.toString() },
//       update: {
//         username: user.login,
//         email: userEmail,
//         githubAccessToken: accessToken, // Update the access token
//       },
//       create: {
//         githubId: user.id.toString(),
//         username: user.login,
//         email: userEmail,
//         githubAccessToken: accessToken, // Save the access token
//       },
//     });

//     // Generate a JWT token
//     const token = generateToken({ id: dbUser.id, username: dbUser.username });

//     // ✅ Redirect to frontend with token
//     res.redirect(
//       `http://localhost:3000/auth/github/callback?token=${token}&username=${dbUser.username}`
//     );
//   } catch (error) {
//     console.error("GitHub OAuth Error:", error);
//     res.redirect("http://localhost:3000/auth/github/callback?error=OAuth failed");
//   }
// };















// import axios from "axios";
// import { URLSearchParams } from 'url';
// import prisma from "../config/db.js"; // Adjust if your Prisma setup differs
// import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_REDIRECT_URI, GITHUB_API_URL } from "../config/github.js";
// import { generateToken } from "../utils/jwt.js";

// export const githubLogin = (req, res) => {
//   const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}`;
//   res.redirect(authUrl);
// };
 

// export const githubCallback = async (req, res) => {
//   try {
//     const { code } = req.query;
//     if (!code) throw new Error("Authorization code missing");

//     // Exchange the code for an access token
//     const response = await fetch("https://github.com/login/oauth/access_token", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         client_id: process.env.GITHUB_CLIENT_ID,
//         client_secret: process.env.GITHUB_CLIENT_SECRET,
//         code,
//       }),
//     });

//     const responseBody = await response.text();
//     const params = new URLSearchParams(responseBody);
//     const accessToken = params.get("access_token");

//     if (!accessToken) throw new Error("Access token not found");

//     const userResponse = await fetch("https://api.github.com/user", {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });
//     const user = await userResponse.json();
//     const userEmail = user.email || `${user.login}@example.com`;

//     const dbUser = await prisma.user.upsert({
//       where: { githubId: user.id.toString() },
//       update: { username: user.login, email: userEmail },
//       create: {
//         githubId: user.id.toString(),
//         username: user.login,
//         email: userEmail,
//       },
//     });

//     // Generate a JWT token
//     const token = generateToken({ id: dbUser.id, username: dbUser.username });

//     res.json({
//       message: "Login successful",
//       user: dbUser,
//       token,
//     });
//   } catch (error) {
//     console.error("GitHub OAuth Error:", error);
//     res.status(500).json({
//       message: "Failed to authenticate with GitHub",
//       error: error.message,
//     });
//   }
// };


// import axios from "axios";
// import { URLSearchParams } from "url";
// import prisma from "../config/db.js"; // Adjust if your Prisma setup differs
// import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_REDIRECT_URI } from "../config/github.js";
// import { generateToken } from "../utils/jwt.js";

// export const githubLogin = (req, res) => {
//   const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}`;
//   res.redirect(authUrl);
// };

// export const githubCallback = async (req, res) => {
//   try {
//     const { code } = req.query;
//     if (!code) throw new Error("Authorization code missing");

//     // Exchange the code for an access token
//     const response = await axios.post(
//       "https://github.com/login/oauth/access_token",
//       {
//         client_id: GITHUB_CLIENT_ID,
//         client_secret: GITHUB_CLIENT_SECRET,
//         code,
//       },
//       {
//         headers: { "Content-Type": "application/json" },
//       }
//     );

//     const params = new URLSearchParams(response.data);
//     const accessToken = params.get("access_token");

//     if (!accessToken) throw new Error("Access token not found");

//     // Fetch the user data from GitHub
//     const userResponse = await axios.get("https://api.github.com/user", {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     const user = userResponse.data;
//     const userEmail = user.email || `${user.login}@example.com`;

//     // Save or update user in the database, including the access token
//     const dbUser = await prisma.user.upsert({
//       where: { githubId: user.id.toString() },
//       update: {
//         username: user.login,
//         email: userEmail,
//         githubAccessToken: accessToken, // Update the access token
//       },
//       create: {
//         githubId: user.id.toString(),
//         username: user.login,
//         email: userEmail,
//         githubAccessToken: accessToken, // Save the access token
//       },
//     });

//     // Generate a JWT token
//     const token = generateToken({ id: dbUser.id, username: dbUser.username });

//     res.json({
//       message: "Login successful",
//       user: dbUser,
//       token,
//     });
//   } catch (error) {
//     console.error("GitHub OAuth Error:", error);
//     res.status(500).json({
//       message: "Failed to authenticate with GitHub",
//       error: error.message,
//     });
//   }
// };