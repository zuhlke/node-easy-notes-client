const { exampleNotes, responseBodies } = require('./test.data.js');
const url = require('../jest.config.js').testURL;
const services = require('../app/services/note.service.js');
const findAll = services.noteService(url + '/notes').findAll;
const matchers = require("@pact-foundation/pact/dsl/matchers");

let EXPECTED_BODY = [];

function setExpectations(state, subscript) {
    EXPECTED_BODY = responseBodies.slice(0, subscript);
    const interaction = {
        state: state,
        uponReceiving: 'a get request without a note id',
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
                'Content-Type': matchers.term({
                    matcher: 'application/json;[ ]{0,}charset=(utf|UTF)-8',
                    generate: 'application/json; charset=utf-8'
                })
            },
            body: EXPECTED_BODY
        }
    };
    return provider.addInteraction(interaction);
}

function doTheTest(state, subscript, done) {
    return setExpectations(state, subscript).then(() => {
        return findAll();
    }).then(responses => {
        expect(responses).toHaveLength(subscript);
        for(var i = 0; i < subscript; i++) {
            const response = responses[i];
            expect(response._id).toEqual(exampleNotes[i]._id);
            expect(response.title).toEqual(exampleNotes[i].title);
            expect(response.content).toEqual(exampleNotes[i].content);
            expect(response.createdAt).toBeTruthy();
            expect(response.updatedAt).toBeTruthy();
            expect(response.__v).toBeGreaterThanOrEqual(0);
        }
    }).then(done)
    .catch(done);
}

describe('The Find All API', () => {

    describe('receive all notes when a get request is sent to /notes without a note id', () => {

        it('will return no notes', done => {
            doTheTest('no notes', 0, done);
        });

        it('will return first note', done => {
            doTheTest('first note', 1, done);
        });

        it('will return two notes', done => {
            doTheTest('two notes', 2, done);
        });
    });
});