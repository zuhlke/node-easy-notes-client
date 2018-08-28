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

## Publishing to a local pact broker
### Set up a local pact broker
see https://github.com/DiUS/pact_broker-docker and especially https://github.com/DiUS/pact_broker-docker/blob/master/POSTGRESQL.md 
```
git clone https://github.com/DiUS/pact_broker-docker.git
cd pact_broker-docker/
brew update
brew install rbenv
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
. ~/.bash_profile
rbenv install 2.5.1
which ruby
rbenv global 2.5.1
rbenv rehash
ruby -v
gem install bundler
which bundle
bundle install
```
Attempting to run
```
DISPOSABLE_PSQL=true script/test.sh
```
This reveals that disposable PSQL is only supported under Linux. Instead, we have to start PostgreSQL in its own Docker container:
```
sudo mkdir -p /private/var/lib/postgresql/data
sudo chmod 777 /private/var/lib/postgresql/data
docker run --name pactbroker-db -e POSTGRES_PASSWORD=AdminOfPactBrokerDb -e POSTGRES_USER=admin -e PGDATA=/var/lib/postgresql/data/pgdata -v /private/var/lib/postgresql/data:/var/lib/postgresql/data -d postgres
```
Wait about 20 seconds
```
docker run -it --link pactbroker-db:postgres --rm postgres sh -c 'exec psql -h "$POSTGRES_PORT_5432_TCP_ADDR" -p "$POSTGRES_PORT_5432_TCP_PORT" -U admin'
```
At this point, enter the admin password specified as POSTGRES_PASSWORD above to get a admin=# prompt.
```
CREATE USER pactbrokeruser WITH PASSWORD 'BrokerOfPacts';
CREATE DATABASE pactbroker WITH OWNER pactbrokeruser;
GRANT ALL PRIVILEGES ON DATABASE pactbroker TO pactbrokeruser;
\q
```
Now we can start up the broker:
```
docker run --name pactbroker --link pactbroker-db:postgres -e PACT_BROKER_DATABASE_USERNAME=pactbrokeruser -e PACT_BROKER_DATABASE_PASSWORD=BrokerOfPacts -e PACT_BROKER_DATABASE_HOST=postgres -e PACT_BROKER_DATABASE_NAME=pactbroker -d -p 80:80 dius/pact-broker
```
Now connect a browser to http://localhost:80. There are no pacts shown.
### Publishing a pact file to the local pact broker

Add the following entry to the scripts object in package.json on the consumer side:
```
"pactTest:publish-local": "node tests/publish-local.js"
```
Add the file `tests/publish-local.js` (contents in https://github.com/pact-foundation/pact-js/blob/master/examples/e2e/test/publish-local.js).

Delete the following properties:
* pactBrokerUsername
* pactBrokerPassword

Update the following properties:
```
pactFilesOrDirs: [path.resolve(__dirname, '../pacts/easy-notes-client-easy-notes-app.json')],
pactBroker: 'http://localhost',
```
Simplify the publishPacts callback as follows:
```
console.log('Pact contract publishing complete!')
console.log('')
console.log('Head over to http://localhost to see your published contracts.')
```
### Retrieving the pact file from the local pact broker
In the provider test spec, change pactUrls as follows:
```
publishVerificationResult: true,
providerVersion: require('../package').version,
pactUrls: [ 'http://localhost/pacts/provider/easy-notes-app/consumer/easy-notes-client/latest/test' ]
```
