const path = require('path');
const { Pact } = require('@pact-foundation/pact');
const url = require('./jest.config.js').testURL;
const [ matched, proto, portString ] = url.match(/^(?:([a-z]+)\:\/\/)?[^:]+(?:\:([0-9]+))?/);
const port = parseInt(portString);
global.port = (port > 0) ? port : (proto == 'https') ? 443 : 80;

global.provider = new Pact({
  port: global.port,
  log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  spec: 2,
  cors: true,
  pactfileWriteMode: 'update',
  consumer: 'easy-notes-client',
  provider: 'easy-notes-app'
});