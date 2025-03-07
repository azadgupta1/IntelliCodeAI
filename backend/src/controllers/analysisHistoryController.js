import prisma from "../config/db.js";

// Fetch all past analyses for the authenticated user
export const getAnalysisHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const analyses = await prisma.analysis.findMany({
      where: { userId },
      include: {
        file: true, // Include file details
      },
      orderBy: { createdAt: "desc" }, // Show latest analyses first
    });

    res.json({ success: true, data: analyses });
  } catch (error) {
    console.error("Error fetching analysis history:", error);
    res.status(500).json({ success: false, message: "Failed to fetch analysis history" });
  }
};

// Fetch a specific past analysis by ID
export const getAnalysisById = async (req, res) => {
  try {
    const userId = req.user.id;
    const analysisId = parseInt(req.params.id, 10);

    const analysis = await prisma.analysis.findFirst({
      where: { id: analysisId, userId },
      include: {
        file: true, // Include file details
      },
    });

    if (!analysis) {
      return res.status(404).json({ success: false, message: "Analysis not found" });
    }

    res.json({ success: true, data: analysis });
  } catch (error) {
    console.error("Error fetching analysis details:", error);
    res.status(500).json({ success: false, message: "Failed to fetch analysis details" });
  }
};
