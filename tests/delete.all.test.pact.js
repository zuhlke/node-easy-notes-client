const Pact = require('@pact-foundation/pact');
const url = require('../jest.config.js').testURL;
const services = require('../app/services/note.service.js');
const deleteAll = services.noteService(url + '/notes').deleteAll;

const EXPECTED_BODY = {
    message: "All notes deleted successfully."
};

function setExpectations(state, subscript) {
    const interaction = {
        state: state,
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
}

function doTheTest(state, subscript, done) {
    return setExpectations(state, subscript).then(() => {
        return deleteAll();
    }).then(response => {
        expect(response).toEqual(EXPECTED_BODY);
    }).then(done)
    .catch(done);
}

describe('The Delete All API', () => {

    describe('Delete all notes when a delete request is sent to /notes without a node id', () => {

        it('will delete no notes', done => {
            doTheTest('no notes', 0, done);
        });

        it('will delete first note', done => {
            doTheTest('first note', 1, done);
        });

        it('will delete two notes', done => {
            doTheTest('two notes', 2, done);
        });
    });
});