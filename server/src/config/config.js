module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || "wedding",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "password",
    options: {
      dialect: process.env.DIALECT || "mysql",
      host: process.env.HOST || "localhost",
      port: 3306
    }
  }
};
