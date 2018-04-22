require("dotenv").config();
const express = require("express");
const FitbitAPIClient = require("fitbit-node");

const app = express();

const client = new FitbitAPIClient({
  clientId: process.env.FITBIT_CLIENT_ID,
  clientSecret: process.env.FITBIT_CLIENT_SECRET
});

app.get("/authorize", (req, res) => {
  res.redirect(
    client.getAuthorizeUrl(
      "activity heartrate location nutrition profile settings sleep social weight",
      process.env.FITBIT_CALLBACK
    )
  );
});

app.get("/callback", (req, res) => {
  client
    .getAccessToken(req.query.code, process.env.FITBIT_CALLBACK)
    .then(result => {
      client
        .get(
          "/activities/heart/date/2018-04-20/1d/1sec/time/00:00/23:59.json",
          result.access_token,
          process.env.FITBIT_USER
        )
        .then(results => {
          res.send(results[0]);
        })
        .catch(err => {
          res.status(err.status).send(err);
        });
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

app.listen(3000);
