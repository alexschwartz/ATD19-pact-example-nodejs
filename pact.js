const pact = require('@pact-foundation/pact')
const Pact = pact.Pact
const path = require('path')
const process = require('process')
const consumerName = 'ATD19_OrderWeb'
const providerName = 'ATD19_OrderApi'
const pactFile = path.resolve(
  `./pacts/${consumerName}-${providerName}.json`.toLowerCase()
)

module.exports = {
  pactFile,
}

const provider = new Pact({
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'FATAL',
  consumer: consumerName,
  provider: providerName,
})

// used to kill any left over mock server instances in case of errors
process.on('SIGINT', () => {
  pact.removeAllServers()
})

module.exports = {
  provider,
  pactFile,
  consumerName,
  providerName,
  consumerVersion: '1.0.0',
}
