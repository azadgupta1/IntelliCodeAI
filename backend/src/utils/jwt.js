import jwt from "jsonwebtoken";


export const generateToken = (userData, accessToken) => {
  return jwt.sign(
    {
      id: userData.id,
      username: userData.username,
      accessToken: accessToken, // Include GitHub access token
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );
};

// export const verifyToken = (token) => {
//   try {
//     return jwt.verify(token, process.env.JWT_SECRET);
//   } catch (error) {
//     throw new Error("Invalid or expired token");
//   }
// };


export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verified Token:", decoded); // Debugging log
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
