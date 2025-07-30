import React from "react";
import URLShortenerPage from "./components/URLShortenerPage";
import URLStatsPage from "./components/URLStatsPage";
import { Box, Container, Typography } from "@mui/material";

function App() {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">URL Shortener</Typography>
      </Box>
      <URLShortenerPage />
      <Box mt={5}>
        <Typography variant="h5">Short URL Stats</Typography>
        <URLStatsPage />
      </Box>
    </Container>
  );
}

export default App;
