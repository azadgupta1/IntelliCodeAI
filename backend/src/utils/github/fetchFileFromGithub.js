// ✅ src/utils/github/fetchFileFromGitHub.js
import axios from "axios";

const fetchFileFromGitHub = async (owner, repo, filePath, commitSha, token) => {
  try {
    const decodedPath = decodeURIComponent(filePath);
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${decodedPath}?ref=${commitSha}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3.raw",
      },
    });

    const content = response.data?.content
      ? Buffer.from(response.data.content, "base64").toString("utf-8")
      : response.data;

    return {
      content,
      sha: response.data.sha,
    };
  } catch (error) {
    console.error("❌ Error fetching file from GitHub:", error.response?.data || error.message);
    return { content: null, sha: null };
  }
};

export default fetchFileFromGitHub;
