import prisma from "../config/db.js";

// Fetch user profile
export const getUserProfile = async (req, res) => {
    try {
      const userId = req.user.id; // Extract user ID from the authenticated token
  
      const user = await prisma.user.findUnique({
        where: { id: userId }, // ✅ Corrected this line
        select: { id: true, username: true, email: true, avatarUrl: true, bio: true },
      });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      res.json({ success: true, user });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  
// Update user profile
export const updateUserProfile = async (req, res) => {
    try {
      const userId = req.user.id;
      const { avatarUrl, bio } = req.body;
  
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { avatarUrl, bio },
        select: { id: true, username: true, email: true, avatarUrl: true, bio: true }, // ✅ Fixing incorrect `select`
      });
  
      res.json({ success: true, user: updatedUser });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  