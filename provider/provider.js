const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const util = require('util')
const server = express()

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use((_, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  next()
})

let dataStoreNormal = require('./data/orders.js')
let dataStoreEmpty = require('./data/orders-empty.js')
let dataStore

server.get('/orders', (_, res) => {
  res.json(dataStore)
})

server.post('/test/setup', (_, res) => {
  //console.log('*** setup **** state:' + util.inspect(_.body.state))

  dataStore = (_.body.state == 'there are no orders') ? dataStoreEmpty : dataStoreNormal
  res.json({})
})

module.exports = {
  server,
  dataStore,
}
