const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

module.exports = {
  seconds: n => n * SECOND,
  minutes: n => n * MINUTE,
  hours: n => n * HOUR,
  days: n => n * DAY
};
