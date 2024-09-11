const jwt = require("jsonwebtoken");
const JWT_SECRET = "blablabla"; // Ensure this matches the secret used when signing the token

const verifyToken = (req, res, next) => {
  console.log("Request Headers:", req.headers); // Log all headers

  const token = req.headers.authorization?.split(" ")[1]; // Extract token from 'Authorization: Bearer <token>'

  if (!token) {
    console.error("No token provided");
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.userId = decoded.userId; // Attach userId to req for use in other routes
    console.log("Decoded userId:", decoded.userId); // Log the decoded userId
    next();
  });
};

module.exports = verifyToken;
