const { sequelize, Sequelize } = require("../db");

const Heartbeat = sequelize.define("heartbeat", {
  amount: {
    type: Sequelize.STRING
  },
  timestamp: {
    type: Sequelize.INTEGER
  }
});

module.exports = Heartbeat;
