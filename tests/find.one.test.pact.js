const { exampleNotes, responseBodies } = require('./test.data.js');
const url = require('../jest.config.js').testURL;
const services = require('../app/services/note.service.js');
const findOne = services.noteService(url + '/notes').findOne;
const matchers = require("@pact-foundation/pact/dsl/matchers");

function setExpectations(state, subscript) {
    const notFoundBody = {
        message: 'Note not found with id ' + responseBodies[subscript]._id.data.generate
    };
    let expectedBody = notFoundBody;
    switch(state) {
        case "first note":
            if(subscript == 0) {
                expectedBody = responseBodies[subscript];
            }
            break;
        case "second note":
            if(subscript == 1) {
                expectedBody = responseBodies[subscript];
            }
            break;
        case "two notes":
            expectedBody = responseBodies[subscript];
            break;
        default:
            break;
    }
    const expectedStatus = (expectedBody === notFoundBody) ? 404 : 200;
    const interaction = {
        state: state,
        uponReceiving: 'a get request for a specific note with note id',
        withRequest: {
            method: 'GET',
            path: '/notes/' + exampleNotes[subscript]._id,
            headers: {
                Accept: 'application/json'
            }
        },
        willRespondWith: {
            status: expectedStatus,
            headers: {
                'Content-Type': matchers.term({
                    matcher: 'application/json;[ ]{0,}charset=(utf|UTF)-8',
                    generate: 'application/json; charset=utf-8'
                })
            },
            body: expectedBody
        }
    };
    return provider.addInteraction(interaction);
}

function doTheTest(state, subscript, done) {
    return setExpectations(state, subscript).then(() => {
        return findOne(exampleNotes[subscript]._id);
    }).then(response => {
        expect(response._id).toEqual(exampleNotes[subscript]._id);
        expect(response.title).toEqual(exampleNotes[subscript].title);
        expect(response.content).toEqual(exampleNotes[subscript].content);
        expect(response.createdAt).toBeTruthy();
        expect(response.updatedAt).toBeTruthy();
        expect(response.__v).toBeGreaterThanOrEqual(0);
    }).then(done)
    .catch(err => {
        expect(err.name).toEqual('StatusCodeError');
        expect(err.statusCode).toEqual(404);
        done();
    })
    .catch(done);
}

describe('The Find One API', () => {

    describe('Retrieve the note when a get request is sent to /notes with a node id', () => {
        it('will not return second note if it is not present', done => {
            doTheTest('no notes', 1, done);
        });

        it('will return first note', done => {
            doTheTest('first note', 0, done);
        });

        it('will not return first note if it is not present', done => {
            doTheTest('second note', 0, done);
        });

        it('will return second note', done => {
            doTheTest('two notes', 1, done);
        });
    });
});