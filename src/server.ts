import "dotenv/config";

import express from "express";
import { initDatabase } from "./database/initDatabase";
import { ErrorHandler } from "./error/ErrorHandler";
import routes from "./routes/index.routes";

const app = express();
app.use(express.json());

app.use("/", routes);

initDatabase();

app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server rodando na porta ${process.env.PORT}`);
});
