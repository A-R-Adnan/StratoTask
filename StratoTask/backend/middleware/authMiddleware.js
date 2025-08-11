const admin = require("../firebaseAdmin");

async function authenticateToken(req, res, next) {
  console.log("\n===== AUTH DEBUG =====");
  console.log("Request:", req.method, req.originalUrl);
  console.log("Headers:", req.headers);

  const authHeader = req.headers.authorization;
  console.log("Authorization header received:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ Missing or badly formatted Authorization header");
    return res.status(401).json({ error: "Unauthorized - missing Bearer" });
  }

  const idToken = authHeader.split(" ")[1];
  console.log("Extracted token length:", idToken?.length);

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log("✅ Token verified! UID:", decodedToken.uid);
    req.user = decodedToken;
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authenticateToken;
