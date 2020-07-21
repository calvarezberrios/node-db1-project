module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/budget.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  // update the following configuration to use PostgreSQL
  production: {
    client: "pg",
    connection: {
      host: "127.0.0.1", // if the server is not running on your computer provide the network address
      database: "northwind", // <-- update
      user: "postgres", // <-- update
      password: "1790", // <-- update
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};
