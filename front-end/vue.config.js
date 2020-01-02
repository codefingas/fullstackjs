const path = require('path');

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: {
      '/api' : {
        target: 'http://localhost:5000'
      }
    }
  }
}