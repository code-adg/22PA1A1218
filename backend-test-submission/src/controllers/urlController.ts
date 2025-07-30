import { Request, Response } from "express";
import { createShortLink, getShortURLStats, getOriginalURL } from "../services/urlService";
import { Log } from "../logger/logger"

export const createShortURL = (req: Request, res: Response) => {
  try {
    const { url, validity, shortcode } = req.body;
    const result = createShortLink(url, validity, shortcode);
    Log("backend", "info", "controller", `Created short link: ${result.shortLink}`);
    res.status(201).json(result);
  } catch (err: any) {
    Log("backend", "error", "controller", err.message);
    res.status(400).json({ error: err.message });
  }
};

export const getStats = (req: Request, res: Response) => {
  try {
    const { shortcode } = req.params;
    const stats = getShortURLStats(shortcode);
    Log("backend", "info", "controller", `Fetched stats for: ${shortcode}`);
    res.json(stats);
  } catch (err: any) {
    Log("backend", "error", "controller", err.message);
    res.status(404).json({ error: err.message });
  }
};

export const redirectURL = (req: Request, res: Response) => {
  try {
    const { shortcode } = req.params;
    const original = getOriginalURL(shortcode, req);
    Log("backend", "info", "controller", `Redirected to original URL for: ${shortcode}`);
    res.redirect(original);
  } catch (err: any) {
    Log("backend", "error", "controller", err.message);
    res.status(404).json({ error: err.message });
  }
};
