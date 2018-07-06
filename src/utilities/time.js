const moment = require("moment");

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const convertToTimestamp = (date, hhmmss) =>
  moment(`${date} ${hhmmss}`, "YYYY-MM-DD HH:mm:ss").format("X");

module.exports = {
  seconds: n => n * SECOND,
  minutes: n => n * MINUTE,
  hours: n => n * HOUR,
  days: n => n * DAY,
  convertToTimestamp
};
