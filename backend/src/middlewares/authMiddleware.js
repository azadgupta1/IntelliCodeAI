// import { verifyToken } from "../utils/jwt.js";

// export const authenticate = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const token = authHeader.split(" ")[1];
//   try {
//     const user = verifyToken(token);
//     req.user = user; // Attach user info to request
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Unauthorized", error: error.message });
//   }
// };


// import { verifyToken } from "../utils/jwt.js";

// export const authenticate = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const token = authHeader.split(" ")[1];
//   try {
//     const user = verifyToken(token);
//     console.log("Decoded User:", user);  // Log decoded user info
//     req.user = user; // Attach user info to request
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Unauthorized", error: error.message });
//   }
// };


import { verifyToken } from "../utils/jwt.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const user = verifyToken(token);
    console.log("Decoded User:", user); // Log decoded user info to debug
    req.user = user; // Attach user info to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};
