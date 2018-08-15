const { exampleNotes, requestBodies, responseBodies } = require('./test.data.js');
const url = require('../jest.config.js').testURL;
const services = require('../app/services/note.service.js');
const deleteOne = services.noteService(url + '/notes').deleteOne;

const expectedMessage = 'Note deleted successfully.';

function setExpectations(state, subscript) {
    const foundBody = {
        message: expectedMessage,
        note: responseBodies[subscript]
    }
    const notFoundBody = {
        message: 'Note not found with id ' + responseBodies[subscript]._id.data.generate
    };
    let expectedBody = notFoundBody;
    switch(state) {
        case "first note":
            if(subscript == 0) {
                expectedBody = foundBody;
            }
            break;
        case "second note":
            if(subscript == 1) {
                expectedBody = foundBody;
            }
            break;
        case "two notes":
            expectedBody = foundBody;
            break;
        default:
            break;
    }
    const expectedStatus = (expectedBody === notFoundBody) ? 404 : 200;
    const interaction = {
        state: state,
        uponReceiving: 'a delete request to delete a specific note with note id',
        withRequest: {
            method: 'DELETE',
            path: '/notes/' + exampleNotes[subscript]._id,
            headers: {
                Accept: 'application/json'
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
        return deleteOne(exampleNotes[subscript]._id);
    }).then(response => {
        expect(response.message).toEqual(expectedMessage);
        expect(response.note._id).toEqual(exampleNotes[subscript]._id);
        expect(response.note.title).toEqual(exampleNotes[subscript].title);
        expect(response.note.content).toEqual(exampleNotes[subscript].content);
        expect(response.note.createdAt).toBeTruthy();
        expect(response.note.updatedAt).toBeTruthy();
        expect(response.note.__v).toBeGreaterThanOrEqual(0);
    }).then(done)
    .catch(err => {
        expect(err.name).toEqual('StatusCodeError');
        expect(err.statusCode).toEqual(404);
        done();
    })
    .catch(done);
}

describe('The Delete One API', () => {

    describe('Create a note when a post request with a body is sent to /notes', () => {

        it('deletes the first note', done => {
            doTheTest('two notes', 0, done);
        });

        it('does not delete the first note if it is not present', done => {
            doTheTest('second note', 0, done);
        });
    });
});
