'use strict'

/**
 * Load modules
 */
const nodeCache     = require('node-cache')
const winston       = require('winston')
const cors          = require('cors')
const express       = require('express')
const bodyParser    = require('body-parser')
const cookieParser  = require('cookie-parser')
/**
 * Put some modules into global
 */
// Caching
if( ! global.Cache) {
    global.Cache = new nodeCache()
}
// Winston (Logging)
if( ! global.Log) {
    global.Log = winston
}
/**
 * Load environment parameters and put them into global
 */
if( ! global.env) {
    global.env = require('dotenv').config().parsed
}

/**
 * Web server
 */
const app = express()

// Parsers
app.use(bodyParser.json())
app.use(cookieParser())

// CORS Settings TODO: Use module instead of settings headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
})

// Routes
const routes = require('./app/routes')
app.use('/', routes)

// Listen
app.listen(global.env.WEB_PORT, () => {
    // ASD
})