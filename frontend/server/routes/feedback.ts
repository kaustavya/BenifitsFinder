import { RequestHandler } from "express";

let storage: any[] = [];

export const submitFeedback: RequestHandler = (req, res) => {
  const { name, email, category, feedback, timestamp } = req.body || {};

  if (!name || !email || !feedback) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  storage.push({
    name,
    email,
    category,
    feedback,
    timestamp: timestamp || Date.now(),
  });
  console.log("Received feedback:", { name, email, category });

  return res.json({ ok: true });
};

export const listFeedback: RequestHandler = (_req, res) => {
  res.json(storage);
};
