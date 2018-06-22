require("dotenv").config();
const express = require("express");
const FitbitAPI = require("./api/fitbit");

const app = express();

app.get("/authorize", (req, res) => {
  res.redirect(FitbitAPI.getAuthorizeUrl());
});

app.get("/callback", (req, res) => {
  FitbitAPI.getAccessToken(req.query.code)
    .then(result => {
      FitbitAPI.get(
        "/activities/heart/date/2018-04-20/1d/1sec/time/00:00/23:59.json",
        result.access_token
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
