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

app.get('/', (req, res) => {
    res.send("Welcome to IntelliCodeAI");
});

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});







// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';

// import authRoutes from "./routes/authRoutes.js";
// import protectedRoute from "./routes/protectedRoutes.js";
// import fileRoute from "./routes/fileRoutes.js";
// import analysisRoutes from "./routes/analysisRoutes.js";
// import githubRoutes from "./routes/githubRoutes.js";
// import webhookRoutes from "./routes/webhookRoutes.js";
// import githubAnalysisRoutes from "./routes/githubAnalysisRoutes.js";
// import protectedRoutes from "./routes/protectedRoutes.js";




// dotenv.config();
// const PORT = process.env.PORT || 5000;
// const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// const app = express();

// // app.use(cors());
// app.use(cors({ origin: FRONTEND_URL, credentials: true }));

// app.use(express.json());
// // Middleware to parse URL-encoded data
// app.use(express.urlencoded({ extended: true }));


// app.use("/auth", authRoutes);
// app.use("/protected", protectedRoute);
// app.use("/files", fileRoute);
// app.use("/analysis", analysisRoutes);

// app.use('/github', githubRoutes);
// app.use('/webhooks', webhookRoutes);
// app.use('/githubAnalysis', githubAnalysisRoutes);

// app.use("/protected", protectedRoutes);


// app.get('/', (req, res) =>{
//     res.send("Welcome to IntelliCodeAI");
// });

// app.listen(PORT, () =>{
//     console.log("Server is running on port "+PORT);
// });





// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser"; // Add this

// import authRoutes from "./routes/authRoutes.js";
// import protectedRoute from "./routes/protectedRoutes.js";
// import fileRoute from "./routes/fileRoutes.js";
// import analysisRoutes from "./routes/analysisRoutes.js";
// import githubRoutes from "./routes/githubRoutes.js";
// import webhookRoutes from "./routes/webhookRoutes.js";
// import githubAnalysisRoutes from "./routes/githubAnalysisRoutes.js";

// dotenv.config();
// const PORT = process.env.PORT || 5000;
// const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// const app = express();

// app.use(cors({ origin: CLIENT_URL, credentials: true })); // Enable credentials
// app.use(express.json());
// app.use(cookieParser()); // Add cookie-parser middleware

// app.use("/auth", authRoutes);
// app.use("/protected", protectedRoute);
// app.use("/files", fileRoute);
// app.use("/analysis", analysisRoutes);
// app.use("/github", githubRoutes);
// app.use("/webhooks", webhookRoutes);
// app.use("/githubAnalysis", githubAnalysisRoutes);

// app.get("/", (req, res) => {
//   res.send("Welcome to IntelliCodeAI");
// });

// app.listen(PORT, () => {
//   console.log("Server is running on port " + PORT);
// });



