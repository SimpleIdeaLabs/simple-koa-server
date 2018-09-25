import * as dotenv from 'dotenv';
import { Server } from './Server';
import { Container } from 'typedi';
import { Database } from './database/Database';

dotenv.config();

(async () => {
  const server = Container.get(Server).app;
  const database = Container.get(Database);
  await database.connect();
  const PORT = process.env.PORT;
  await server.listen(PORT || 3000);
  console.log(`App running on ${PORT}`);
})();