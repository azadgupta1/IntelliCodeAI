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

// export const commitAnalysis = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const analysis = await prisma.analysis.findUnique({ where: { id } });

//     if (!analysis) {
//       return res.status(404).json({ success: false, message: "Analysis not found." });
//     }

//     if (analysis.isCommitted) {
//       return res.status(200).json({ success: true, alreadyCommitted: true });
//     }

//     await prisma.analysis.update({
//       where: { id },
//       data: { isCommitted: true },
//     });

//     res.json({ success: true, alreadyCommitted: false });
//   } catch (error) {
//     console.error("Error committing analysis:", error);
//     res.status(500).json({ success: false, message: "Failed to commit analysis" });
//   }
// };

export const commitAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return res.status(400).json({ success: false, message: "Invalid analysis ID" });
    }

    const analysis = await prisma.analysis.findUnique({
      where: { id: numericId },
    });

    if (!analysis) {
      return res.status(404).json({ success: false, message: "Analysis not found." });
    }

    if (analysis.isCommited) {
      return res.status(200).json({ success: true, alreadyCommitted: true });
    }

    await prisma.analysis.update({
      where: { id: numericId },
      data: { isCommited: true },
    });

    res.json({ success: true, alreadyCommitted: false });
  } catch (error) {
    console.error("Error committing analysis:", error);
    res.status(500).json({ success: false, message: "Failed to commit analysis" });
  }
};



// export const getAnalysisHistory = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const analyses = await prisma.analysis.findMany({
//       where: {
//         userId,
//         ignored: false, // Exclude ignored analyses
//       },
//       include: {
//         file: true, // Include file details
//       },
//       orderBy: { createdAt: "desc" }, // Show latest analyses first
//     });

//     res.json({ success: true, data: analyses });
//   } catch (error) {
//     console.error("Error fetching analysis history:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch analysis history" });
//   }
// };



export const ignoreRepoAnalysis = async (req, res) => {
  const { analysisId } = req.body;

  try {
    const userId = req.user.id;

    // Fetch and verify ownership
    const analysis = await prisma.analysis.findUnique({
      where: { id: analysisId },
    });

    if (!analysis || analysis.userId !== userId) {
      return res.status(404).json({ success: false, message: "Analysis not found or unauthorized" });
    }

    // Update to ignored
    const updatedAnalysis = await prisma.analysis.update({
      where: { id: analysisId },
      data: { ignored: true },
    });

    return res.status(200).json({
      success: true,
      message: "Analysis ignored successfully",
      data: updatedAnalysis,
    });
  } catch (error) {
    console.error("Error ignoring analysis:", error);
    return res.status(500).json({ success: false, message: "Server error" });
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


