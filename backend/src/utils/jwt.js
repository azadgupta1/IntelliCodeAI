import jwt from "jsonwebtoken";

// export const generateToken = (payload) => {
//   return jwt.sign(payload, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRATION,
//   });
// };

// export const generateToken = (userData, accessToken) => {
//   return jwt.sign(
//     {
//       id: userData.id,
//       username: userData.username,
//       accessToken: accessToken, // Include accessToken in the JWT payload
//     },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_EXPIRATION }
//   );
// };


// export const verifyToken = (token) => {
//   try {
//     return jwt.verify(token, process.env.JWT_SECRET);
//   } catch (error) {
//     throw new Error("Invalid or expired token");
//   }
// };



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

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
