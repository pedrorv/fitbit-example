const FitbitTokenModel = require("../models/fitbit-token");

class FitbitTokenService {
  static create(accessToken, refreshToken) {
    return FitbitTokenModel.findOrCreate({
      where: { accessToken, refreshToken }
    }).spread(fitbitToken => fitbitToken);
  }

  static last() {
    return FitbitTokenModel.findAll({
      raw: true,
      limit: 1,
      order: [["createdAt", "DESC"]]
    }).then(tokens => tokens[0] || null);
  }
}

module.exports = FitbitTokenService;
