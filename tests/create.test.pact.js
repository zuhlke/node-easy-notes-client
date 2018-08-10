const Pact = require('@pact-foundation/pact');
const create = require('../app/services/note.service.js').create;

describe('The API', () => {
    const url = 'http://localhost:8989';

    // Copy this block once per interaction under test
    describe('Create a note when a post request with a body is sent to /notes', () => {
        const EXPECTED_BODY = [{
            title: "first notes",
            content: "Wa hahaha"
        }];
        beforeEach(() => {
            const interaction = {
                state: 'Has no notes',
                uponReceiving: 'a post request to create a new note',
                withRequest: {
                    method: 'POST',
                    path: '/notes',
                    body: EXPECTED_BODY[0],
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: EXPECTED_BODY
                }
            };
            return provider.addInteraction(interaction);
        });

        // add expectations
        it('Returns newly created note', done => {
            create(url + '/notes', EXPECTED_BODY[0])
                .then(response => {
                    expect(response).toEqual(EXPECTED_BODY);
                })
                .then(done);
        });
    });
});