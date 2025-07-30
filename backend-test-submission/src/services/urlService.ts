import { v4 as uuidv4 } from "uuid";
import { Request } from "express";

interface URLData {
  url: string;
  shortLink: string;
  expiry: string;
  createdAt: string;
  clicks: {
    timestamp: string;
    referrer: string;
    location: string;
  }[];
}

const db: Record<string, URLData> = {};

export const createShortLink = (url: string, validity = 30, shortcode?: string) => {
  if (!url) throw new Error("URL is required");

  const code = shortcode || uuidv4().slice(0, 6);
  if (db[code]) throw new Error("Shortcode already exists");

  const now = new Date();
  const expiry = new Date(now.getTime() + validity * 60000).toISOString();

  const entry: URLData = {
    url,
    shortLink: `http://localhost:5000/${code}`,
    expiry,
    createdAt: now.toISOString(),
    clicks: [],
  };

  db[code] = entry;
  return {
    shortLink: entry.shortLink,
    expiry: entry.expiry,
  };
};

export const getShortURLStats = (code: string) => {
  const entry = db[code];
  if (!entry) throw new Error("Shortcode not found");

  return {
    url: entry.url,
    createdAt: entry.createdAt,
    expiry: entry.expiry,
    totalClicks: entry.clicks.length,
    clicks: entry.clicks,
  };
};

export const getOriginalURL = (code: string, req: Request): string => {
  const entry = db[code];
  if (!entry) throw new Error("Shortcode not found");

  const now = new Date().toISOString();
  if (now > entry.expiry) throw new Error("Link has expired");

  entry.clicks.push({
    timestamp: now,
    referrer: req.get("Referer") || "unknown",
    location: "India", // Hardcoded for now
  });

  return entry.url;
};
