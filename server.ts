import express from "express";
import path from "path";

const app = express();

// Railway (and most hosts) assign the port dynamically via this env var.
// Hardcoding 3000 will break the deployment.
const PORT = Number(process.env.PORT) || 3000;

// Optional login gate for the admin panel.
// Set ADMIN_PASSWORD (required to enable the gate) and optionally ADMIN_USERNAME
// (defaults to "admin" if not set) in your environment (Railway: Variables tab).
// Without ADMIN_PASSWORD, the admin panel stays open to anyone who finds the URL.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";

function requireAdminAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!ADMIN_PASSWORD) {
    console.warn(
      "[WARNING] ADMIN_PASSWORD is not set. /admin is currently UNPROTECTED. " +
        "Set the ADMIN_PASSWORD environment variable to require a login."
    );
    return next();
  }

  const authHeader = req.headers.authorization || "";
  const [scheme, encoded] = authHeader.split(" ");

  if (scheme === "Basic" && encoded) {
    const decoded = Buffer.from(encoded, "base64").toString("utf-8");
    const separatorIndex = decoded.indexOf(":");
    const username = separatorIndex >= 0 ? decoded.slice(0, separatorIndex) : "";
    const password = separatorIndex >= 0 ? decoded.slice(separatorIndex + 1) : decoded;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return next();
    }
  }

  res.set("WWW-Authenticate", 'Basic realm="Admin Area"');
  res.status(401).send("Authentication required.");
}

// IMPORTANT: admin routes are registered BEFORE express.static.
// If static-file serving ran first, it would hand out admin.html directly
// from disk and this password check would never run.
app.get(["/admin", "/admin.html"], requireAdminAuth, (req, res) => {
  res.sendFile(path.join(process.cwd(), "admin.html"));
});

// Serve static files (index.html, firebase.js, etc.) from root directory
app.use(express.static(process.cwd()));

// Serves the public homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
