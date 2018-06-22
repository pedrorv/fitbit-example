const FitbitAPIClient = require("fitbit-node");

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

  refreshAccessToken(accessToken, refreshToken) {
    return this.client.refreshAccessToken(accessToken, refreshToken);
  }

  get(path, accessToken) {
    return this.client.get(path, accessToken, process.env.FITBIT_USER);
  }
}

module.exports = new FitbitAPI();
