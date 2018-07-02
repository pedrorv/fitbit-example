const HeartbeatModel = require("../models/heartbeat");
const { convertToTimestamp } = require("../utilities/time");

class HeartbeatService {
  static create(amount, timestamp) {
    return HeartbeatModel.findOrCreate({ where: { amount, timestamp } }).spread(
      heartbeat => heartbeat
    );
  }

  static last() {
    return HeartbeatModel.findAll({
      limit: 1,
      order: [["createdAt", "DESC"]]
    }).then(heartbeats => heartbeats[0] || null);
  }

  static async storeIntradayActivity(data) {
    const transformedData = this.transformResponse(data);

    for (let activity of transformedData) {
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
