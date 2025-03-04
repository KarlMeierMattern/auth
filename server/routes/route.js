import express from "express";

const router = express.Router();

// Send user details to frontend to access username
router.get("/user-info", (req, res) => {
  res.json({ username: req.user.username });
});

export default router;
