const pact = require('@pact-foundation/pact-node')
const path = require('path')
const opts = {
  pactFilesOrDirs: [path.resolve(__dirname, '../pacts/easy-notes-client-easy-notes-app.json')],
  pactBroker: 'http://localhost',
  tags: ['prod', 'test'],
  consumerVersion: '1.0.1'
}

pact.publishPacts(opts)
  .then(() => {
    console.log('Pact contract publishing complete!')
    console.log('')
    console.log('Head over to http://localhost to see your published contracts.')
  })
  .catch(e => {
    console.log('Pact contract publishing failed: ', e)
  })