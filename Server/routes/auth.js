import express from "express";
const router = express.Router();


// Mock database
const users = [];

// Registration route
router.post("/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  users.push({ firstName, lastName, email, password });
  res.status(201).json({ message: "User registered successfully" });
});

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json({ message: "Login successful" });
});

export default router;  
