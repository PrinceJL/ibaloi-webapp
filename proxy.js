const express = require("express");
const app = express();
const PORT = 3000;

// Lazy-load node-fetch since it's ESM-only
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const GAS_URL = "https://script.google.com/macros/s/AKfycbwDsmJEmfVwHGwNWSGEzOB-CMC2Bv1tCXntSJEhe8m1wyFWM7j5IhpwUfksKst0_6Vftw/exec";

app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Proxy GET
app.get("/api", async (req, res) => {
  try {
    const url = GAS_URL + "?" + new URLSearchParams(req.query);
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Proxy GET failed" });
  }
});

// Proxy POST
app.post("/api", async (req, res) => {
  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Proxy POST failed" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy running at http://localhost:${PORT}`);
});
