const { Pact, Matchers } = require('@pact-foundation/pact');
const { eachLike, like, term, iso8601DateTimeWithMillis } = Matchers;
const url = require('../jest.config.js').testURL;
const services = require('../app/services/note.service.js');
const create = services.noteService(url + '/notes').create;

describe('The Create API', () => {

    // Copy this block once per interaction under test
    describe('Create a note when a post request with a body is sent to /notes', () => {

        const NOTE_ID = '5b71b7eeecbd28bac0b3f1ea';
        const TITLE = 'First Note';
        const CONTENT = 'Doe, a deer, a female deer';

        const EXPECTED_REQUEST_BODY = {
            title: TITLE,
            content: CONTENT
        };
        const EXPECTED_RESPONSE_BODY = {
            _id: like(NOTE_ID),
            title: like(TITLE),
            content: like(CONTENT),
            createdAt: iso8601DateTimeWithMillis(),
            updatedAt: iso8601DateTimeWithMillis(),
            __v: like(0)
        };

        beforeEach(() => {
            const interaction = {
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
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: EXPECTED_RESPONSE_BODY
                }
            };
            return provider.addInteraction(interaction);
        });

        // add expectations
        it('Returns newly created note', done => {
            const newNote = create(EXPECTED_REQUEST_BODY).then(response => {
                expect(response._id).toEqual(NOTE_ID);
                expect(response.title).toEqual(TITLE);
                expect(response.content).toEqual(CONTENT);
                expect(response.createdAt).toBeTruthy();
                expect(response.updatedAt).toBeTruthy();
                expect(response.__v).toBeGreaterThanOrEqual(0);
            }).then(done);
        });
    });
});