const services = require('../services/note.service.js');
const appConfig = require('../../config/server.app.config.js');
const noteService = services.noteService(appConfig.url);

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Note cannot be empty."
        });
    }

    noteService.create(req.body)
        .then(data => {
            res.send({note: data});
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating your note."
            });
        });
};

exports.findAll = (req, res) => {
    noteService.findAll()
        .then(notes => {
            res.send({notes: notes});
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

exports.findOne = (req, res) => {
    noteService.findOne(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send({note: note});
        }).catch(err => {
        return res.status(500).send({
            message: err.message
        });
    })
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Note can not be empty."
        });
    }

    noteService.update(req.params.noteId, req.body)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send({note: note});
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            });
        });
};

exports.deleteAll = (req, res) => {
    noteService.deleteAll()
        .then(
            res.send({message: "All notes deleted successfully."}))
        .catch(err => {
            return res.status(500).send({
                message: err.message
            });
        });
};

exports.deleteOne = (req, res) => {
    noteService.deleteOne(req.params.noteId)
        .then(response => {
            if (!response) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }

            res.send({message: "Note deleted successfully."});
        }).catch(err => {
        return res.status(500).send({
            message: err.message
        });
    });
};

exports.displayAll = (req, res) => {
  noteService.findAll()
      .then(notes => {
          res.render("index", {
              title: 'Easy Notes',
              message: 'Welcome to EasyNotes client. Take notes quickly. Organise and keep track of all your notes.',
              notes: notes});
      }).catch(err => {
          res.status(500).render("index", {
              title: "Easy Notes",
              message: "Oops!",
              error: err.message
          });
      })
};

exports.displayOne = (req, res) => {
    noteService.findOne(req.params.noteId)
        .then(note => {
            if (!note) {
                res.render("note", {
                    title: "Easy Notes",
                    message: "Note not found with id " + req.params.noteId
                });
            } else {
                res.render("note", {
                    title: "Easy Notes",
                    message: "View or Edit note",
                    note: note
                });
            }
        }).catch(err => {
            return res.status(500).render("note", {
                title: "Easy Notes",
                message: "Oops!",
                error: err.message
            });
        });
};

exports.save = (req, res) => {
    if (!req.body) {
        return res.render("save", {
            title: "Easy Notes",
            message: "Note cannot be empty."
        });
    }

    noteService.create(req.body)
        .then(note => {
            res.render("save", {
                title: "Easy Notes",
                message: "New note created!",
                note: note
            });
        }).catch(err => {
            res.status(500).render("save", {
                title: "Easy Notes",
                message: "Some error occurred while creating your note.",
                error: err.message
            });
        });
};

exports.newNote = (req, res) => {
    res.render("editNote", {
        title: "Easy Notes"
    });
};