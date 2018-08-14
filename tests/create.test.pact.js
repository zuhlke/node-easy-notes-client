const { exampleNotes, requestBodies, responseBodies } = require('./test.data.js');
const url = require('../jest.config.js').testURL;
const services = require('../app/services/note.service.js');
const create = services.noteService(url + '/notes').create;

function setExpectations(state, subscript) {
    const interaction = {
        state: state,
        uponReceiving: 'a post request to create a new note',
        withRequest: {
            method: 'POST',
            path: '/notes',
            body: requestBodies[subscript],
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
            body: responseBodies[subscript]
        }
    };
    return provider.addInteraction(interaction);
}

function doTheTest(state, subscript, done) {
    return setExpectations(state, subscript).then(() => {
        return create(requestBodies[subscript]);
    }).then(response => {
        expect(response._id).toEqual(exampleNotes[subscript]._id);
        expect(response.title).toEqual(exampleNotes[subscript].title);
        expect(response.content).toEqual(exampleNotes[subscript].content);
        expect(response.createdAt).toBeTruthy();
        expect(response.updatedAt).toBeTruthy();
        expect(response.__v).toBeGreaterThanOrEqual(0);
    }).then(done)
    .catch(done);
}

describe('The Create API', () => {

    describe('Create a note when a post request with a body is sent to /notes', () => {

        it('creates the first note', done => {
            doTheTest('no notes', 0, done);
        });

        it('creates the second note', done => {
            doTheTest('first note', 1, done);
        });
    });
});