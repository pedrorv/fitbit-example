const { sequelize, Sequelize } = require("../db");

const Heartbeat = sequelize.define(
  "heartbeat",
  {
    amount: {
      type: Sequelize.INTEGER
    },
    timestamp: {
      type: Sequelize.INTEGER
    }
  },
  { timestamps: false }
);

Heartbeat.sync();

module.exports = Heartbeat;
