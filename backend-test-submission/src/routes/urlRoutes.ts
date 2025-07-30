import express from "express";
import { createShortURL, getStats, redirectURL } from "../controllers/urlController";

const router = express.Router();

router.post("/shorturls", createShortURL);
router.get("/shorturls/:shortcode", getStats);
router.get("/:shortcode", redirectURL);

export default router;
