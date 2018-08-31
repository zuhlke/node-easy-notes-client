module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // REST API endpoints
    app.get('/notes', notes.findAll);
    app.post('/notes', notes.create);
    app.get('/notes/:noteId', notes.findOne);
    app.put('/notes/:noteId', notes.update);
    app.delete('/notes', notes.deleteAll);
    app.delete('/notes/:noteId', notes.deleteOne);

    // Browser client endpoints
    app.get('/index', notes.displayAll);
    app.get('/newNote', notes.newNote);
    app.post('/save', notes.save);
    app.get('/editNote/:noteId', notes.editNote);
    app.get('/confirmDeleteOne/:noteId', notes.confirmDeleteOne);
    app.get('/deleteOne/:noteId', notes.okDeleteOne);
    app.get('/confirmDeleteAll', notes.confirmDeleteAll);
    app.get('/deleteAll', notes.okDeleteAll);
};