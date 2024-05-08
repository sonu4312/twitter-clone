import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "2d",
  });

  res.cookie("jwt", token, {
    maxAge: 2 * 24 * 60 * 60 * 1000,
    httpOnly: true, //the cookie will only accessible through HTTP requests
    sameSite:"strict", // Restrict cookie to same-site requests only
    secure:process.env.NODE_ENV !== "development" // Enable secure cookie in production environment
  });
};


