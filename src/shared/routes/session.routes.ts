import { Router } from "express";
import { requestValidation } from "../middlewares/requestValidation";
import SessionController from "../../controllers/SessionController";
import { createSessionSchema } from "../../schemas/schemas";

const sessionController = new SessionController();

const sessionRouter = Router();

sessionRouter.post(
  "/",
  requestValidation(createSessionSchema),
  sessionController.create,
);

export default sessionRouter;
