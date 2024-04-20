import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { dbConnection } from "./database/dbConnection.js";


config({ path: "./config.env" });


const HOST = process.env.APP_HOST
const PORT = process.env.APP_PORT || 5000;


const app = express();

app.use(cors());
app.use(express.json());

// test

app.get('/', (req, res) => {
  res.send('Hello World!');
})

// Connect to MongoDB
dbConnection();

// Define routes and middleware

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
