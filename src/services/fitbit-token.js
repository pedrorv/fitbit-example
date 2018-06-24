const FitbitTokenModel = require("../models/fitbit-token");

class FitbitTokenService {
  static create(accessToken, refreshToken) {
    return FitbitTokenModel.findOrCreate({
      where: { accessToken, refreshToken }
    }).spread(fitbitToken => fitbitToken);
  }
}

module.exports = FitbitTokenService;
