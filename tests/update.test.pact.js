const Pact = require('@pact-foundation/pact');
const url = require('../jest.config.js').testURL;
const services = require('../app/services/note.service.js');
const update = services.noteService(url + '/notes').update;

describe('The API', () => {

    // Copy this block once per interaction under test
    describe('Update note if exists', () => {
        const EXPECTED_BODY = {
            title: "first notes",
            content: "Wa hahaha"
        };
        beforeEach(() => {
            const interaction = {
                state: 'Have a note with id 1',
                uponReceiving: 'a request to update an existing note',
                withRequest: {
                    method: 'PUT',
                    path: '/notes/1',
                    body: EXPECTED_BODY,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
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
        it('Returns the updated note', done => {
            update('1', EXPECTED_BODY)
                .then(response => {
                    expect(response).toEqual(EXPECTED_BODY);
                })
                .then(done);
        });
    });
});