import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));



app.use("/auth", authRoutes);



app.get('/', (req, res) =>{
    res.send("Welcome to IntelliCodeAI");
});

app.listen(PORT, () =>{
    console.log("Server is running on port "+PORT);
});