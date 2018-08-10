const Pact = require('@pact-foundation/pact');
const url = 'http://localhost:8989';
const service = require('../app/services/note.service.js');
const findOne = service.note('http://localhost:8989/notes').findOne;

describe('The API', () => {

    // Copy this block once per interaction under test
    describe('Retrieve the note when a get request is sent to /notes with a node id', () => {
        const EXPECTED_BODY = [{
            title: "first notes",
            content: "Wa hahaha"
        }];
        beforeEach(() => {
            const interaction = {
                state: 'Have a note with id 1',
                uponReceiving: 'a get request to get a specific note with note id',
                withRequest: {
                    method: 'GET',
                    path: '/notes/1',
                    headers: {
                        Accept: 'application/json'
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
        it('Returns the note', done => {
            findOne('1')
                .then(response => {
                    expect(response).toEqual(EXPECTED_BODY);
                })
                .then(done);
        });
    });
});