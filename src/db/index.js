const Sequelize = require("sequelize");
const { DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD } = process.env;

const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  {
    host: "localhost",
    dialect: "sqlite",
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },

    storage: "./src/db/fitbit.sqlite"
  }
);

module.exports = {
  Sequelize,
  sequelize
};
