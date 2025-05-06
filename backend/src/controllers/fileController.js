import multer from "multer";
import prisma from "../config/db.js";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

export const upload = multer({ storage }).single("file");

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { filename } = req.file;
    const fileUrl = `/uploads/${filename}`; // Adjust if needed based on hosting
    const userId = req.user ? req.user.id : null; // Capture userId if authenticated

    // Save file with optional userId
    const file = await prisma.file.create({
      data: {
        filename,
        fileUrl,
        userId,
      },
    });

    res.status(201).json({
      message: "File uploaded successfully",
      file,
    });
  } catch (error) {
    console.error("File Upload Error:", error);
    res.status(500).json({
      message: "Failed to upload file",
      error: error.message,
    });
  }
};