// import prisma from "../config/db.js";
// import axios from "axios";

// export const fetchUserRepos = async (req, res) => {
//   try {
//     const accessToken = req.user.accessToken; // Assume you store accessToken in user
//     const githubApiUrl = "https://api.github.com/user/repos";

//     // Fetch repositories from GitHub API
//     const response = await axios.get(githubApiUrl, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     const repositories = response.data;

//     // Store repositories in the database
//     const savedRepos = [];
//     for (const repo of repositories) {
//       const savedRepo = await prisma.githubRepo.upsert({
//         where: { repoUrl: repo.html_url },
//         update: {},
//         create: {
//           userId: req.user.id,
//           repoName: repo.name,
//           repoUrl: repo.html_url,
//         },
//       });
//       savedRepos.push(savedRepo);
//     }

//     res.status(200).json({
//       message: "Repositories fetched and saved successfully",
//       repositories: savedRepos,
//     });
//   } catch (error) {
//     console.error("Error fetching repositories:", error.message);
//     res.status(500).json({
//       message: "Failed to fetch repositories",
//       error: error.message,
//     });
//   }
// };


import prisma from "../config/db.js";
import axios from "axios";

export const fetchUserRepos = async (req, res) => {
    console.log("Incoming Headers:", req.headers);
    console.log("User's Access Token:", req.user?.accessToken); // Log the accessToken to ensure it's available

  try {
    // Log the accessToken to ensure it's available in the request
    console.log("User's Access Token:", req.user.accessToken);

    const accessToken = req.user.accessToken; // Assume you store accessToken in user
    const githubApiUrl = "https://api.github.com/user/repos";

    // Fetch repositories from GitHub API
    const response = await axios.get(githubApiUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log("GitHub Repositories Response:", response.data); // Log the response from GitHub API

    const repositories = response.data;

    // Store repositories in the database
    const savedRepos = [];
    for (const repo of repositories) {
      console.log(`Saving repository: ${repo.name}`); // Log each repo being saved

      const savedRepo = await prisma.githubRepo.upsert({
        where: { repoUrl: repo.html_url },
        update: {},
        create: {
          userId: req.user.id,
          repoName: repo.name,
          repoUrl: repo.html_url,
        },
      });

      console.log(`Repository saved: ${savedRepo.repoName}`); // Log saved repo details
      savedRepos.push(savedRepo);
    }

    res.status(200).json({
      message: "Repositories fetched and saved successfully",
      repositories: savedRepos,
    });
  } catch (error) {
    console.error("Error fetching repositories:", error.message);
    res.status(500).json({
      message: "Failed to fetch repositories",
      error: error.message,
    });
  }
};
