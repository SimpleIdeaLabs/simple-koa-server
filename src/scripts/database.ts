import program from 'commander';
import { Container } from 'typedi';
import { Database } from './../database/Database';

const db = Container.get(Database);

program
  .version('0.1.0');

program
  .command('reset')
  .description('Run TypeORM synchronize')
  .option("-w, --with_option [option]", 'Seed database')
  .action(async (options) => {
    try {
      await db.connect();
      await db.connection.synchronize(true);
      console.log('Database reset...');

      if (options && options.with_option) {
        switch (options.with_option) {
          case 'seeding':
            await db.seed();
            console.log('Seeding finished...');
            break;
        }
      }
      
      process.exit();
    } catch (error) {
      console.log(error);
    }
  });

program
  .command('clear')
  .description('Run TypeORM clear on each entities.')
  .action(async () => {
    try {
      await db.connect();
      await db.reset();
      console.log('Database cleared...');
      process.exit();
    } catch (error) {
      console.log(error);
    }
  });

program.parse(process.argv);
