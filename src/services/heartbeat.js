const { Sequelize } = require("../db");
const HeartbeatModel = require("../models/heartbeat");
const { convertToTimestamp } = require("../utilities/time");

const { Op } = Sequelize;

class HeartbeatService {
  static create(amount, timestamp) {
    return HeartbeatModel.findOrCreate({ where: { amount, timestamp } }).spread(
      heartbeat => heartbeat
    );
  }

  static last() {
    return HeartbeatModel.findAll({
      raw: true,
      limit: 1,
      order: [["timestamp", "DESC"]]
    }).then(heartbeats => heartbeats[0] || null);
  }

  static getAll(from = 0, to = 2147483647) {
    return HeartbeatModel.findAll({
      raw: true,
      order: [["timestamp", "ASC"]],
      where: {
        timestamp: {
          [Op.gte]: from,
          [Op.lte]: to
        }
      }
    }).then(heartbeats => heartbeats || []);
  }

  static async storeIntradayActivity(data) {
    const transformedData = this.transformResponse(data);
    const lastRecord = await this.last();
    const activities = !lastRecord
      ? transformedData
      : transformedData.filter(a => a.timestamp > lastRecord.timestamp);

    for (let activity of activities) {
      const { amount, timestamp } = activity;
      await this.create(amount, timestamp);
    }

    return true;
  }

  static transformResponse(intraday) {
    const activities = intraday["activities-heart"][0];
    const activitiesIntraday = intraday["activities-heart-intraday"]["dataset"];
    const date = activities["dateTime"];

    const mapToTimestamp = activity => {
      const hhmmss = activity.time;
      const timestamp = convertToTimestamp(date, hhmmss);

      return {
        timestamp,
        amount: activity.value
      };
    };

    return activitiesIntraday.map(mapToTimestamp);
  }
}

module.exports = HeartbeatService;
