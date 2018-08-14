# node-easy-notes-client
This is the client for the easy-notes PoC.
It is written in node.js and uses a REST interface
provided by the easy-notes app.

The purpose of the client and server is to
learn about Consumer-Driven Contract (CDC)
testing using Pact.

Run the tests as follows:
```
npm run pactTest
```

This verifies the conformance of the API to the client specification and
generates the corresponding pact file. This file can be published to a
pact broker or simply copied to the pacts folder on the provider side.
