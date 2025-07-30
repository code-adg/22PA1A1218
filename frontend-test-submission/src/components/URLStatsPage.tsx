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

const URLStatsPage = () => {
  const [code, setCode] = useState("");
  const [stats, setStats] = useState<any>(null);

  const handleFetchStats = async () => {
    try {
      await Log("frontend", "info", "component", `Fetching stats for ${code}`);
      const response = await axios.get(
        `http://localhost:5000/shorturls/${code}`
      );
      setStats(response.data);
      await Log("frontend", "info", "component", "Stats fetched successfully");
    } catch (err: any) {
      await Log("frontend", "error", "component", err.message);
      alert("Failed to fetch stats");
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" gap={2} mb={2}>
          <TextField
            fullWidth
            label="Enter Shortcode"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleFetchStats}
            sx={{ whiteSpace: "nowrap" }}
          >
            Fetch
          </Button>
        </Box>

        {stats && (
          <Box mt={3}>
            <Typography>
              <b>Original URL:</b> {stats.url}
            </Typography>
            <Typography>
              <b>Created At:</b> {stats.createdAt}
            </Typography>
            <Typography>
              <b>Expiry:</b> {stats.expiry}
            </Typography>
            <Typography>
              <b>Total Clicks:</b> {stats.totalClicks}
            </Typography>
            <Box mt={2}>
              <Typography variant="h6">Click Data:</Typography>
              {stats.clicks.map((c: any, i: number) => (
                <Typography key={i}>
                  • {c.timestamp}, Referrer: {c.referrer}, Location: {c.location}
                </Typography>
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default URLStatsPage;
