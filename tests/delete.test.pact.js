const Pact = require('@pact-foundation/pact');
const deleteOne = require('../app/services/note.service.js').delete;

describe('The API', () => {
    const url = 'http://localhost:8989';

    // Copy this block once per interaction under test
    describe('Delete the note when a delete request is sent to /notes with a node id', () => {
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
                    body: 'Note deleted successfully.'
                }
            };
            return provider.addInteraction(interaction);
        });

        // add expectations
        it('Delete the note', done => {
            deleteOne(url + '/notes/1')
                .then(response => {
                    expect(response).toEqual('Note deleted successfully.');
                })
                .then(done);
        });
    });
});