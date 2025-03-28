import axios from "axios";
import prisma from "../config/db.js";

export const enableAutoAnalysis = async (userId, repoName, githubToken) => {
  try {

    //--------------------------------------------------------------------------------------
    // const repo = await prisma.githubRepo.findFirst({
    //   where: { userId, repoName },
    // });

    //-----------------------------------------------------------------------------------------

    // const repoWithoutUser = await prisma.githubRepo.findFirst({
    //     where: { repoName: { equals: repoName, mode: "insensitive" } },
    //   });
    //   console.log("Repo without user filter:", repoWithoutUser);

    const repos = await prisma.githubRepo.findMany({
        where: { 
          userId, 
          repoName: { equals: repoName, mode: "insensitive" } 
        },
      });
      
      // Get the first repo from the array
      const repo = repos[0];
      
      if (!repo) {
        throw new Error("Repository not found in database");
      }
      
      console.log("Using repo:", repo);

    // GitHub Webhook Configuration
    const webhookData = {
      name: "web",
      active: true,
      events: ["push"],
      config: {
        url: `${process.env.WEBHOOK_URL}/webhooks/github`, // Ensure this is publicly accessible
        content_type: "json",
        secret: process.env.GITHUB_WEBHOOK_SECRET, // Optional for security
      },
    };

    // Create Webhook via GitHub API
    // const response = await axios.post(
    //   `https://api.github.com/repos/${repoName}/hooks`,
    //   webhookData,
    //   { headers: { Authorization: `Bearer ${githubToken}` } }
    // );
    // const response = await axios.post(
    //     `https://api.github.com/repos/${repo.ownerName}/${repo.repoName}/hooks`, // FIXED
    //     webhookData,
    //     { headers: { Authorization: `Bearer ${githubToken}` } }
    //   );
      
    // Construct API URL
const apiUrl = `https://api.github.com/repos/${repo.ownerName}/${repo.repoName}/hooks`;

// Debug Log
console.log("GitHub API URL:", apiUrl);
console.log("GitHub Token:", githubToken ? "Present" : "Missing");
console.log("Webhook Data:", JSON.stringify(webhookData, null, 2));

try {
    // Create Webhook via GitHub API
    const response = await axios.post(apiUrl, webhookData, {
        headers: { Authorization: `Bearer ${githubToken}` }
    });

    // Store Webhook ID in Database
    await prisma.githubRepo.update({
        where: { id: repo.id },
        data: { webhookId: response.data.id.toString(), autoAnalyze: true },
    });

    return { success: true, message: "Auto-analysis enabled successfully" };
} catch (error) {
    console.error("GitHub API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || error.message);
}


    // Store Webhook ID in Database
    await prisma.githubRepo.update({
      where: { id: repo.id },
      data: { webhookId: response.data.id.toString(), autoAnalyze: true },
    });

    return { success: true, message: "Auto-analysis enabled successfully" };
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};






// 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