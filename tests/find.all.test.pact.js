const Pact = require('@pact-foundation/pact');
const url = require('../jest.config.js').testURL;
const services = require('../app/services/note.service.js');
const findAll = services.noteService(url + '/notes').findAll;

describe('The Find All API', () => {

    // Copy this block once per interaction under test
    describe('Receive no notes in initial state when a get request is sent to /notes', () => {
        const EXPECTED_BODY = [];
        beforeEach(() => {
            const interaction = {
                state: 'no notes',
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
            findAll()
                .then(response => {
                    expect(response).toEqual(EXPECTED_BODY);
                })
                .then(done);
        });
    });

    describe('Receive one note in single-note state when a get request is sent to /notes', () => {
        const EXPECTED_BODY = [{
            title: "first notes",
            content: "Wa hahaha"
        }];
        beforeEach(() => {
            const interaction = {
                state: 'second note',
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
            findAll()
                .then(response => {
                    expect(response).toEqual(EXPECTED_BODY);
                })
                .then(done);
        });
    });
});