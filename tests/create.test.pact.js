const { Pact, Matchers } = require('@pact-foundation/pact');
const { like } = Matchers;
const url = require('../jest.config.js').testURL;
const service = require('../app/services/note.service.js');
const create = service.note(url + '/notes').create;

describe('The API', () => {

    // Copy this block once per interaction under test
    describe('Create a note when a post request with a body is sent to /notes', () => {
        const EXPECTED_REQUEST_BODY = {
            title: "first notes",
            content: "Wa hahaha"
        };
        const EXPECTED_RESPONSE_BODY = [{
            _id: '0001',
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
                    body: EXPECTED_REQUEST_BODY,
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
                    body: like(EXPECTED_RESPONSE_BODY)
                }
            };
            return provider.addInteraction(interaction);
        });

        // add expectations
        it('Returns newly created note', done => {
            create(EXPECTED_REQUEST_BODY)
                .then(response => {
                    expect(response).toEqual(EXPECTED_RESPONSE_BODY);
                })
                .then(done);
        });
    });
});