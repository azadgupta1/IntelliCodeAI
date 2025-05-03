import express from "express";
import prisma from "../config/db.js";

const router = express.Router();

// Get all unread notifications for a user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await prisma.notification.findMany({
      where: { userId: parseInt(userId), isRead: false },
      orderBy: { createdAt: "desc" },
    });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// Mark all notifications as read
router.post("/mark-read/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    await prisma.notification.updateMany({
      where: { userId: parseInt(userId), isRead: false },
      data: { isRead: true },
    });
    res.json({ message: "All notifications marked as read" });
  } catch (err) {
    res.status(500).json({ error: "Failed to mark notifications as read" });
  }
});

export default router;
