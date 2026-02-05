import express from "express";
import { config } from "dotenv";
config();
import { ConnectDB } from "./config/DbConnection.js";
import { seedAdmin } from "./config/seedAdmin.js";
import cors from "cors";
import productRoutes from "./routes/ProductRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";

const app = express();
const port = process.env.PORT || 8080;

// Connect to database
ConnectDB();

// Seed default admin user
seedAdmin();

// -----------Middleware----------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
// -------------------------------------

// Routes
app.get("/", (req, res) => {
  res.send("Server Started.");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log("Server is listening on http://localhost:" + port);
});
