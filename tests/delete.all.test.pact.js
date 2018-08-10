const Pact = require('@pact-foundation/pact');
const url = 'http://localhost:8989';
const service = require('../app/services/note.service.js');
const deleteAll = service.note('http://localhost:8989/notes').deleteAll;

describe('The API', () => {

    // Copy this block once per interaction under test
    describe('Delete all notes when a delete request is sent to /notes without a node id', () => {
        const EXPECTED_BODY = [{
            message: "All notes deleted successfully."
        }];
        beforeEach(() => {
            const interaction = {
                state: 'Have a note with id 1',
                uponReceiving: 'a delete request to delete all notes',
                withRequest: {
                    method: 'DELETE',
                    path: '/notes',
                    headers: {
                        Accept: 'application/json'
                    }
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json; charset=utf8'
                    },
                    body: EXPECTED_BODY
                }
            };
            return provider.addInteraction(interaction);
        });

        // add expectations
        it('Delete the note', done => {
            deleteAll()
                .then(response => {
                    expect(response).toEqual(EXPECTED_BODY);
                })
                .then(done);
        });
    });
});