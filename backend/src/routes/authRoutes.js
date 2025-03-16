// import express from "express";
// import { githubLogin, githubCallback } from "../controllers/authController.js";

// const router = express.Router();

// // GitHub OAuth routes
// router.get("/github/login", githubLogin);
// router.get("/github/callback", githubCallback);

// export default router;


import express from "express";
import { githubLogin, githubCallback } from "../controllers/authController.js";

const router = express.Router();

router.get("/github/login", githubLogin);
router.get("/github/callback", githubCallback);

export default router;