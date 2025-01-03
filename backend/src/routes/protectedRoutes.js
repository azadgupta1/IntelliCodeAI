import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/resource", authenticate, (req, res) => {
  res.json({
    message: "This is a protected route",
    user: req.user,
  });
});

export default router;
