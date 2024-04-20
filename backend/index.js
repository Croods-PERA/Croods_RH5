import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { dbConnection } from "./database/dbConnection.js";

const app = express();
config({ path: "./config.env" });

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
dbConnection();

// Define routes and middleware

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
