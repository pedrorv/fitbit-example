const HeartbeatModel = require("../models/heartbeat");

class HeartbeatService {
  static create(amount, timestamp) {
    return HeartbeatModel.findOrCreate({ where: { amount, timestamp } }).spread(
      heartbeat => heartbeat
    );
  }
}

module.exports = HeartbeatService;
