require("dotenv").config();
const express = require("express");
const FitbitAPI = require("./api/fitbit");
const FitbitTokenService = require("./services/fitbit-token");
const { sequelize } = require("./db");
const { hours } = require("./utilities/time");

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

app.on("db-ready", () => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
  setInterval(() => FitbitAPI.refreshAccessToken(), hours(4));
});
sequelize.authenticate().then(() => app.emit("db-ready"));
