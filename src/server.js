require("dotenv").config();
const express = require("express");
const csv = require("csv-express");
const FitbitAPI = require("./api/fitbit");
const FitbitTokenService = require("./services/fitbit-token");
const HeartbeatService = require("./services/heartbeat");
const { sequelize } = require("./db");
const { hours, seconds } = require("./utilities/time");

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/authorize", (req, res) => {
  res.redirect(FitbitAPI.getAuthorizeUrl());
});

app.get("/callback", (req, res) => {
  FitbitAPI.getAccessToken(req.query.code)
    .then(result => {
      const { access_token, refresh_token } = result;

      FitbitTokenService.create(access_token, refresh_token).then(fitbitToken =>
        res.send(fitbitToken)
      );
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

app.get("/heartbeat", (req, res) => {
  const { from, to } = req.query;

  HeartbeatService.getAll(from, to).then(heartbeats => {
    res.csv(heartbeats, true);
  });
});

app.on("db-ready", () => {
  app.listen(PORT, "0.0.0.0", () =>
    console.log(`Server listening on port ${PORT}.`)
  );
  setInterval(() => FitbitAPI.refreshAccessToken(), hours(4));
  setInterval(() => {
    console.log(`Getting new heartbeat records`);
    FitbitAPI.getTodaysHeartIntraday().then(data =>
      HeartbeatService.storeIntradayActivity(data)
    );
  }, seconds(25));
});
sequelize.authenticate().then(() => app.emit("db-ready"));
