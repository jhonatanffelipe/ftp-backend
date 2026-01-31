import { Router } from "express";
import { createSessionSchema } from "../schemas/schemas";
import { requestValidation } from "../middlewares/requestValidation";
import SessionController from "../controllers/SessionController";

const sessionController = new SessionController();

const sessionRouter = Router();

sessionRouter.post(
  "/",
  requestValidation(createSessionSchema),
  sessionController.create,
);

export default sessionRouter;
