const { sequelize, Sequelize } = require("../db");

const FitbitToken = sequelize.define("fitbit_token", {
  accessToken: {
    type: Sequelize.STRING
  },
  refreshToken: {
    type: Sequelize.STRING
  }
});

FitbitToken.sync();

module.exports = FitbitToken;
