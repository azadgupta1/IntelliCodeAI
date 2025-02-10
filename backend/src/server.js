import express from 'express';
import dotenv from 'dotenv';

import authRoutes from "./routes/authRoutes.js";
import protectedRoute from "./routes/protectedRoutes.js";
import fileRoute from "./routes/fileRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import githubRoutes from "./routes/githubRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";

import githubAnalysisRoutes from "./routes/githubAnalysisRoutes.js";


dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));


app.use("/auth", authRoutes);
app.use("/protected", protectedRoute);
app.use("/files", fileRoute);
app.use("/analysis", analysisRoutes);

app.use('/github', githubRoutes);
app.use('/webhooks', webhookRoutes);
app.use('/githubAnalysis', githubAnalysisRoutes);


app.get('/', (req, res) =>{
    res.send("Welcome to IntelliCodeAI");
});

app.listen(PORT, () =>{
    console.log("Server is running on port "+PORT);
});




