import Router from "express";
import sessionRouter from "./session.routes";
import userRouter from "./user.routes";

const routes = Router();

routes.use("/session", sessionRouter);
routes.use("/users", userRouter);

export default routes;
