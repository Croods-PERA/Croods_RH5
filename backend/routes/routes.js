import isAuth from "../middleware/auth.middleware.js";

const setupRoutes = (app) => {
    // Setup your routes here
    // app.use("/api/auth", authRouter);
    // app.use("/api/post", [isAuth.verifyToken], postRouter);
    // app.use("/api/user", [isAuth.verifyToken], userRouter);
  };
  
  export default setupRoutes;