module.exports = {
  "type": "mysql",
  "host": process.env.MYSQL_HOST,
  "port": +process.env.MYSQL_PORT,
  "username": process.env.MYSQL_USERNAME,
  "password": process.env.MYSQL_PASSWORD,
  "database": process.env.MYSQL_DB,
  "logging": ["error"],
  "synchronize": false,
  "entities": [
    "dist/database/models/*.js"
  ],
  "subscribers": [
    "src/subscriber/*.js"
  ],
  "migrations": [
    "src/migration/*.js"
  ],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}