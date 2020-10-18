module.exports =
{
   "type": "mysql",
   "host": process.env.HOST || "0.0.0.0",
   "port": process.env.PORT || 3306,
   "username": process.env.USERNAME || "node",
   "password": process.env.PASSWORD || "pass",
   "database": process.env.DATABASE || "Weather",
   "synchronize": false,
   "logging": true,
   "entities": [
      "src/typedb/entity/**/*.ts"
   ],
   "migrations": [
      "src/typedb/migration/**/*.ts"
   ],
   "subscribers": [
      "src/typedb/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/typedb/entity",
      "migrationsDir": "src/typedb/migration",
      "subscribersDir": "src/typedb/subscriber"
   }
}
