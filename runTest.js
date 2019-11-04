const { pactFile } = require('./pact.js')

// Let's use async/await
module.exports = {
  runTests: testTypes => {
    const Mocha = require('mocha')
    const fs = require('fs')
    const path = require('path')

    // Instantiate a Mocha instance.
    const mocha = new Mocha()
  
    // Add spec files
    testTypes.forEach(testType => {
      const testDir = `${__dirname}/${testType}`;
      fs.readdirSync(testDir)
        .filter(file => file.endsWith('spec.js'))
        .forEach(file => mocha.addFile(path.join(testDir, file)))
    })

    mocha.timeout(15000)
    mocha.run(failures => {
      if (failures) {
        console.log(
          `test failed :(\nOpen the log file in ./logs to see what happened`
        )
      } else {
        console.log(
          `test passed! Open the pact file in ${pactFile}`
        )
      }
    })
    mocha.timeout(15000)
  },
}
