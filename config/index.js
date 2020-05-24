const dotenv = require('dotenv')

const result = dotenv.config()
if (result.error) {
  throw result.error
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST,
  PORT: process.env.PORT
}
