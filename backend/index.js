import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { dbConnection } from "./database/dbConnection.js";


config({ path: "./config.env" });


const HOST = process.env.APP_HOST
const PORT = process.env.APP_PORT || 5000;

// Connect to MongoDB
dbConnection();


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test
app.get('/', (req, res) => {
  res.status(200).send("Server works!");
});


// Define routes and middleware


// For request of undefined path
app.use("*", function (req, res) {
  res.status(404).send("Can't found this API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
