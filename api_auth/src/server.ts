import * as dotenv from "dotenv";
import moongose from "mongoose";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

import AppRouter from "./routes";
import * as mongoDBConnection from "./config/db/mongodb/connection";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(AppRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`🌐 🔉 Listening on port ${PORT}`);
});

moongose
  .connect(mongoDBConnection.url, mongoDBConnection.options)
  .then(() => {
    console.log("✅ MongoDB is connected");
  })
  .catch((err) => {
    console.log(`🔴  ${err}`);
  });
