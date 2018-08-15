const { exampleNotes, requestBodies, responseBodies } = require('./test.data.js');
const url = require('../jest.config.js').testURL;
const services = require('../app/services/note.service.js');
const update = services.noteService(url + '/notes').update;

function setExpectations(state, subscript) {
    const notFoundBody = {
        message: 'Note not found with id ' + responseBodies[subscript]._id.data.generate
    };
    let expectedBody = notFoundBody;
    responseBodies[2]._id.data.generate = exampleNotes[subscript]._id;
    switch(state) {
        case "first note":
            if(subscript == 0) {
                expectedBody = responseBodies[2];
            }
            break;
        case "second note":
            if(subscript == 1) {
                expectedBody = responseBodies[2];
            }
            break;
        case "two notes":
            expectedBody = responseBodies[2];
            break;
        default:
            break;
    }
    const expectedStatus = (expectedBody === notFoundBody) ? 404 : 200;
    const interaction = {
        state: state,
        uponReceiving: 'an update request for a specific note with note id',
        withRequest: {
            method: 'PUT',
            path: '/notes/' + exampleNotes[subscript]._id,
            body: requestBodies[2],
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        },
        willRespondWith: {
            status: expectedStatus,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: expectedBody
        }
    };
    return provider.addInteraction(interaction);
}

function doTheTest(state, subscript, done) {
    return setExpectations(state, subscript).then(() => {
        return update(exampleNotes[subscript]._id, requestBodies[2]);
    }).then(response => {
        expect(response._id).toEqual(exampleNotes[subscript]._id);
        expect(response.title).toEqual(exampleNotes[2].title);
        expect(response.content).toEqual(exampleNotes[2].content);
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

describe('The Update One API', () => {

    describe('Update the note when a put request is sent to /notes with a node id', () => {
        it('will not update second note if it is not present', done => {
            doTheTest('no notes', 1, done);
        });

        it('will update first note', done => {
            doTheTest('first note', 0, done);
        });

        it('will not update first note if it is not present', done => {
            doTheTest('second note', 0, done);
        });

        it('will update second note', done => {
            doTheTest('two notes', 1, done);
        });
    });
});
