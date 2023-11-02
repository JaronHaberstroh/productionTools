import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import employeeRoutes from "./routes/userRoutes.js";

// Import .env variables
config();

// Create PORT variable
const PORT = process.env.PORT || 3000;

// Initialize app instance
const app = express();

// Enable cors
app.use(cors());

// Enable handling of JSON data
app.use(express.json());

// Enable body parsing
app.use(express.urlencoded({ extended: true }));

// MongoDB
await mongoose.connect(process.env.MONGO_URI);

// Mount routes
app.use("/user", employeeRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
