const Pact = require('@pact-foundation/pact');
const url = require('../jest.config.js').testURL;
const services = require('../app/services/note.service.js');
const deleteAll = services.noteService(url + '/notes').deleteAll;

describe('The API', () => {

    // Copy this block once per interaction under test
    describe('Delete all notes when a delete request is sent to /notes without a node id', () => {
        // given...
        const EXPECTED_BODY = {
            message: "All notes deleted successfully."
        };
        beforeEach(() => {
            const interaction = {
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
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: EXPECTED_BODY
                }
            };
            return provider.addInteraction(interaction);
        });

        // when...
        it('Delete the note', done => {
            // then...
            deleteAll()
                .then(response => {
                    expect(response).toEqual(EXPECTED_BODY);
                })
                .then(done);
        });
    });
});