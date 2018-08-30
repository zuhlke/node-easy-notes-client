module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    app.get('/', notes.displayAll);
    app.get('/notes', notes.findAll);
    app.post('/notes', notes.create);
    app.get('/new', notes.new);
    app.post('/save', notes.save);
    app.get('/notes/:noteId', notes.findOne);
    app.get('/note/:noteId', notes.displayOne);
    app.put('/notes/:noteId', notes.update);
    app.delete('/notes', notes.deleteAll);
    app.delete('/notes/:noteId', notes.deleteOne);
};