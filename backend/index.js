import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import cookieParser from "cookie-parser";


import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./router/userRouter.js";
import testRouter from "./router/testRouter.js";


config({ path: "./config.env" });


const HOST = process.env.APP_HOST
const PORT = process.env.APP_PORT || 5000;

// Connect to MongoDB
dbConnection();


const app = express();

app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test
app.get('/', (req, res) => {
  res.status(200).send("Server works!");
});

// app.get('/protected', isAuthenticatedPatient.catchAsyncErrors, (req, res) => {
//   // If the middleware function does not end the request-response cycle,
//   // it must call next() to pass control to the next middleware function.
//   // Otherwise, the request will be left hanging.
//   res.json({ message: 'You have accessed a protected route!', userId: req.userId });
// });


// Define routes and middleware
app.use("/api/v1/user", userRouter);
app.use("/api/v1/test", testRouter);

// For request of undefined path
app.use("*", function (req, res) {
  res.status(404).send("Can't found this API!");
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
