// external libs import
import * as dotenv from 'dotenv';
import express from 'express';
// import moongose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';

// internal imports

import * as middleware from './middleware';
// import * as mongoDBConnection from './config/db/mongodb/connection';

import AppRouter from './routes';

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

app.use(middleware.errorHandler);
app.use(middleware.notFoundHandler);

app.listen(PORT, () => {
  console.log(`✅ Listening on port ${PORT}`);
});

// moongose
//   .connect(mongoDBConnection.url, mongoDBConnection.options)
//   .then(() => {
//     console.log('✅ MongoDB is connected');
//   })
//   .catch((err) => {
//     console.log(`🔴  ${err}`);
//   });
