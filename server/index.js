const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')

// import API routes
const routes = require('../route')

const app = express()

// CORS config
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
    method: ['POST'],
    allowedHeaders: ['Content-Type']
  })
)

// security headers
app.use(helmet())

// request body parser
app.use(bodyParser.json())
app.use(bodyParser.raw({
  limit: '2mb'
}))

// compress with gzip
app.use(compression())

// attach routes
app.use('/', routes)

module.exports = app
