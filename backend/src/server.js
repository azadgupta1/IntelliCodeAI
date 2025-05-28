import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from "./routes/authRoutes.js";
import protectedRoute from "./routes/protectedRoutes.js";
import fileRoute from "./routes/fileRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import githubRoutes from "./routes/githubRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";
import githubAnalysisRoutes from "./routes/githubAnalysisRoutes.js";
import userRoutes from './routes/userRoute.js';
import githubFixRoutes from "./routes/githubFixRoutes.js";
import notificationRoutes from "./routes/notification.js";
import chartRoutes from './routes/chartRoutes.js';
// Existing imports...
import './jobs/snapshotErrorHistory.js';
import chatbotRoutes from './routes/chatbotRoutes.js';



dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true, // Allow cookies and authentication
    })
  );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/protected", protectedRoute);
app.use("/files", fileRoute);
app.use("/analysis", analysisRoutes);
app.use('/github', githubRoutes);
app.use('/webhooks', webhookRoutes);
app.use('/githubAnalysis', githubAnalysisRoutes);
app.use('/user', userRoutes);

app.use("/api/fix", githubFixRoutes);

app.use("/api/notification", notificationRoutes);
app.use("/api/history", chartRoutes);
app.use("/api", chatbotRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to IntelliCodeAI");
});

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
