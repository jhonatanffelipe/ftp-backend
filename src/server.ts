import "dotenv/config";

import express from "express";
import { initDatabase } from "./shared/database/initDatabase";
import { ErrorHandler } from "./shared/error/ErrorHandler";
import routes from "./shared/routes/index.routes";

const app = express();
app.use(express.json());

app.use("/", routes);

initDatabase();

app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server rodando na porta ${process.env.PORT}`);
});
