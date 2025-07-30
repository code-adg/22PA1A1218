import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Log } from "../logging/logger";

const URLShortenerPage = () => {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [expiry, setExpiry] = useState("");

  const handleSubmit = async () => {
    try {
      await Log("frontend", "info", "component", "Submitting URL");
      const response = await axios.post("http://localhost:5000/shorturls", {
        url,
        validity: validity ? parseInt(validity) : undefined,
        shortcode: shortcode || undefined,
      });

      setShortLink(response.data.shortLink);
      setExpiry(response.data.expiry);
      await Log("frontend", "info", "component", "Short URL created successfully");
    } catch (error: any) {
      await Log("frontend", "error", "component", `Error: ${error.message}`);
      alert("Failed to create short URL");
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Original URL"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <Box display="flex" gap={2}>
            <TextField
              label="Validity (mins)"
              fullWidth
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
            />
            <TextField
              label="Preferred Shortcode (optional)"
              fullWidth
              value={shortcode}
              onChange={(e) => setShortcode(e.target.value)}
            />
          </Box>

          <Button fullWidth variant="contained" onClick={handleSubmit}>
            Shorten
          </Button>

          {shortLink && (
            <Box mt={3}>
              <Typography>
                <b>Short URL:</b>{" "}
                <a href={shortLink} target="_blank" rel="noopener noreferrer">
                  {shortLink}
                </a>
              </Typography>
              <Typography>
                <b>Expires at:</b> {expiry}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default URLShortenerPage;
