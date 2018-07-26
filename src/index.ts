import 'reflect-metadata';
import { App } from './app';
import * as dotenv from 'dotenv';
import Database from './database/Database';
import { Server, createServer } from 'http';
dotenv.config();

// Wrap Startup on EIFI
(async () => {
  try {

    // Connect Database
    await Database.connect();

    // Reset Database
    await Database.reset();

    // Run Seeds
    await Database.seed();

    // Build Server
    const server = createServer(new App().app.callback());
    const port = process.env.PORT;

    // Fire Up Server
    server.listen(port, (err) => {
      if (err) throw new Error(err);
      console.log(`Running on ${port}`);
    });
  } catch(e) {
    console.log('Start up error');
    throw new Error(e);
  }
})();
