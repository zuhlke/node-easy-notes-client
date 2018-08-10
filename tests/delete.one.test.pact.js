const Pact = require('@pact-foundation/pact');
const url = 'http://localhost:8989';
const service = require('../app/services/note.service.js');
const deleteOne = service.note('http://localhost:8989/notes').deleteOne;

describe('The API', () => {

    // Copy this block once per interaction under test
    describe('Delete the note when a delete request is sent to /notes with a node id', () => {
        const EXPECTED_BODY = {
            message: "Note deleted successfully.",
            note: {
                title: "first notes",
                content: "Wa hahaha"
            }
        };
        beforeEach(() => {
            const interaction = {
                state: 'Have a note with id 1',
                uponReceiving: 'a delete request to delete a specific note with note id',
                withRequest: {
                    method: 'DELETE',
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
        it('Delete the note', done => {
            deleteOne('1')
                .then(response => {
                    expect(response).toEqual(EXPECTED_BODY);
                })
                .then(done);
        });
    });
});