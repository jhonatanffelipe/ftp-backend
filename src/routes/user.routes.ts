import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { requestValidation } from "../middlewares/requestValidation";
import UserController from "../controllers/UserController";
import { createUserSchema } from "../schemas/schemas";

const userController = new UserController();

const userRouter = Router();

userRouter.use(isAuthenticated);
userRouter.post(
  "/",
  requestValidation(createUserSchema),
  userController.create,
);

export default userRouter;
