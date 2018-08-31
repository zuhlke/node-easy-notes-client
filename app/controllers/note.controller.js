const services = require('../services/note.service.js');
const appConfig = require('../../config/server.app.config.js');
const noteService = services.noteService(appConfig.url);

/**
 * Control functions to support the REST API
 */

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

/**
 * The following control functions are not part of the REST API - they support browser forms
 */

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

exports.editNote = (req, res) => {
    noteService.findOne(req.params.noteId)
    .then(note => {
        if (!note) {
            res.render("save", {
                headline: "Easy Notes",
                message: "Note not found with id " + req.params.noteId
            });
        } else {
            res.render("editNote", {
                headline: "Easy Notes",
                note: note
            });
        }
    }).catch(err => {
        return res.status(500).render("save", {
            headline: "Easy Notes",
            message: "Oops!",
            error: err.message
        });
    });
};

exports.save = (req, res) => {
    if (!(req.body && req.body.title)) {
        return res.render("save", {
            headline: "Easy Notes",
            message: "Note cannot be empty."
        });
    }

    if(req.body._id) {
        noteService.update(req.body._id, req.body)
        .then(note => {
            res.render("save", {
                headline: "Easy Notes",
                message: "Note updated!",
                note: note
            });
        }).catch(err => {
            res.status(500).render("save", {
                headline: "Easy Notes",
                message: "Some error occurred while saving your note.",
                error: err.message
            });
        });
    } else {
        delete req.body._id; // must be undefined, but edit form sets it to a blank string
        noteService.create(req.body)
        .then(note => {
            res.render("save", {
                headline: "Easy Notes",
                message: "New note created!",
                note: note
            });
        }).catch(err => {
            res.status(500).render("save", {
                headline: "Easy Notes",
                message: "Some error occurred while creating your note.",
                error: err.message
            });
        });
    }
};

exports.newNote = (req, res) => {
    res.render("editNote", {
        headline: "Easy Notes",
        note: {
            title: "",
            content: ""
        }
    });
};

exports.confirmDeleteOne = (req, res) => {
    noteService.findOne(req.params.noteId)
    .then(note => {
        if (!note) {
            res.render("save", {
                headline: "Easy Notes",
                message: "Note not found with id " + req.params.noteId
            });
        } else {
            res.render("save", {
                headline: "Easy Notes",
                message: "Are you sure you wish to delete the following note?",
                okAction: "/deleteOne/" + note._id,
                note: note
            });
        }
    }).catch(err => {
        return res.status(500).render("save", {
            headline: "Easy Notes",
            message: "Oops!",
            error: err.message
        });
    });
};

exports.okDeleteOne = (req, res) => {
    noteService.deleteOne(req.params.noteId)
    .then(response => {
        res.redirect('/index');
    }).catch(err => {
        return res.status(500).render("save", {
            headline: "Easy Notes",
            message: "Oops!",
            error: err.message
        });
    });
};

exports.confirmDeleteAll = (req, res) => {
    res.render("save", {
        headline: "Easy Notes",
        message: "Are you sure you wish to delete all your notes?",
        okAction: "/deleteAll"
    });
};

exports.okDeleteAll = (req, res) => {
    noteService.deleteAll()
    .then(response => {
        res.redirect('/index');
    }).catch(err => {
        return res.status(500).render("save", {
            headline: "Easy Notes",
            message: "Oops!",
            error: err.message
        });
    });
};
