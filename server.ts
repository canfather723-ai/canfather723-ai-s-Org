import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

const db = new Database("factory.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT CHECK(type IN ('image', 'video')),
    url TEXT NOT NULL,
    caption TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    block_type TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed Data
const postCount = db.prepare("SELECT COUNT(*) as count FROM posts").get() as { count: number };
if (postCount.count === 0) {
  const seedPosts = [
    { type: 'image', url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800', caption: 'Our latest batch of 6" hollow blocks ready for delivery.' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1590069230011-6f5d57a8d511?auto=format&fit=crop&q=80&w=800', caption: 'Precision manufacturing in progress. Quality is our priority.' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800', caption: 'Supplying the new City Center development project.' }
  ];
  const insert = db.prepare("INSERT INTO posts (type, url, caption) VALUES (?, ?, ?)");
  seedPosts.forEach(p => insert.run(p.type, p.url, p.caption));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use("/uploads", express.static(uploadDir));

  // API Routes
  app.get("/api/posts", (req, res) => {
    const posts = db.prepare("SELECT * FROM posts ORDER BY created_at DESC").all();
    res.json(posts);
  });

  app.post("/api/posts", upload.single("file"), (req, res) => {
    const { type, caption, url: providedUrl } = req.body;
    let finalUrl = providedUrl;

    if (req.file) {
      finalUrl = `/uploads/${req.file.filename}`;
    }

    if (!finalUrl) {
      return res.status(400).json({ error: "No file or URL provided" });
    }

    const info = db.prepare("INSERT INTO posts (type, url, caption) VALUES (?, ?, ?)").run(type, finalUrl, caption);
    res.json({ id: info.lastInsertRowid, url: finalUrl });
  });

  app.get("/api/orders", (req, res) => {
    const orders = db.prepare("SELECT * FROM orders ORDER BY created_at DESC").all();
    res.json(orders);
  });

  app.post("/api/orders", (req, res) => {
    const { customer_name, customer_email, block_type, quantity } = req.body;
    const info = db.prepare("INSERT INTO orders (customer_name, customer_email, block_type, quantity) VALUES (?, ?, ?, ?)").run(customer_name, customer_email, block_type, quantity);
    res.json({ id: info.lastInsertRowid });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
