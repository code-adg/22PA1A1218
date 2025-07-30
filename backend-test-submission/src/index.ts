import express from "express";
import cors from "cors";
import urlRoutes from "./routes/urlRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", urlRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
