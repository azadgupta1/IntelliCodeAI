import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js"; // Your middleware

const router = express.Router();

router.get("/user", authenticate, async (req, res) => {
    try {
        console.log("req.user:", req.user);
        res.json({ user: req.user }); // Send the user object attached by middleware
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

export default router;