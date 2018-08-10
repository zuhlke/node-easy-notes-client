const Pact = require('@pact-foundation/pact');
const findAll = require('../app/services/note.services.js').findAll;

describe('The API', () => {
    const url = 'http://localhost:8989';

    // Copy this block once per interaction under test
    describe('Receive notes when a get request is sent to /notes', () => {
        const EXPECTED_BODY = [{
            title: "first notes",
            content: "Wa hahaha"
        }];
        beforeEach(() => {
            const interaction = {
                uponReceiving: 'a get request to get all notes',
                withRequest: {
                    method: 'GET',
                    path: '/notes',
                    headers: {
                        Accept: 'application/json'
                    }
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: EXPECTED_BODY
                }
            };
            return provider.addInteraction(interaction);
        });

        // add expectations
        it('Returns all notes', done => {
            findAll(url + '/notes')
                .then(response => {
                    expect(response).toEqual(EXPECTED_BODY);
                })
                .then(done);
        });
    });
});