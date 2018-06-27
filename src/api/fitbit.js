const FitbitAPIClient = require("fitbit-node");
const FitbitTokenService = require("../services/fitbit-token");

class FitbitAPI {
  constructor() {
    this.client = new FitbitAPIClient({
      clientId: process.env.FITBIT_CLIENT_ID,
      clientSecret: process.env.FITBIT_CLIENT_SECRET
    });
  }

  getAuthorizeUrl() {
    return this.client.getAuthorizeUrl(
      "activity heartrate location nutrition profile settings sleep social weight",
      process.env.FITBIT_CALLBACK
    );
  }

  getAccessToken(code) {
    return this.client.getAccessToken(code, process.env.FITBIT_CALLBACK);
  }

  async refreshAccessToken() {
    const lastToken = await FitbitTokenService.last();
    if (!lastToken) return null;

    const refreshedToken = await this.client.refreshAccessToken(
      lastToken.accessToken,
      lastToken.refreshToken
    );
    if (!refreshedToken) return null;

    const {
      access_token: accessToken,
      refresh_token: refreshToken
    } = refreshedToken;

    return FitbitTokenService.create(accessToken, refreshToken);
  }

  get(path, accessToken) {
    return this.client.get(path, accessToken, process.env.FITBIT_USER);
  }
}

module.exports = new FitbitAPI();
