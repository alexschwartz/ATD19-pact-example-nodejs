const Verifier = require('@pact-foundation/pact').Verifier
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const getPort = require('get-port')
const { server } = require('./provider.js')
const { providerName, pactFile } = require('../pact.js')
chai.use(chaiAsPromised)
let port
let opts

// Verify that the provider meets all consumer expectations
describe('Pact Verification for OrderAPI', () => {
  before(async () => {
    port = await getPort()
    opts = {
      provider: providerName,
      providerBaseUrl: `http://localhost:${port}`,
      providerStatesSetupUrl: `http://localhost:${port}/test/setup`, // the url to call to set up states
      pactUrls: [pactFile], 
      tags: ['prod'],
      providerVersion: '1.0.' + process.env.HOSTNAME,
    }

    server.listen(port, () => {
      console.log(`Provider service listening on http://localhost:${port}`)
    })
  })

  it('should validate the expectations of Order Web', () => {
    return new Verifier()
      .verifyProvider(opts)
      .then(output => {
        console.log('Pact Verification Complete!')
        console.log(output)
        process.exit(0);
      })
      .catch(e => {
        console.error('Pact verification failed :(', e)
        process.exit(1);
      })
  })
})
