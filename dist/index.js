import mongodbConnection from './libs/mongodb';
import { createRedisConnection } from './libs/redis';
import register from './config/register';
import routing from './routes';

import express from 'express';

const app = express();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3003;

// register.js
register(app, express);
// route.js
routing(app);

createRedisConnection().then(() => {
  mongodbConnection().then(() => {
    app.listen(port, host, console.log(`app listen on ${port}`));
  }).catch(err => {
    console.log(err);
    process.exit(0);
  });
}).catch(err => {
  console.log(err);
  process.exit(0);
});