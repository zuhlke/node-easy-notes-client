const service = require('../services/note.service.js');
const note = service.note('http://easy-notes-app:8080/notes')

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Note cannot be empty."
        });
    }

    note.create(req.body)
        .then(data => {
            res.send({note: data});
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating your note."
            });
        });
};

exports.findAll = (req, res) => {
    note.findAll()
        .then(notes => {
            res.send({notes: notes});
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

exports.findOne = (req, res) => {
    note.findOne(req.params.noteId)
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

    note.update(req.params.noteId, req.body)
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
    note.deleteAll()
        .then(
            res.send({message: "All notes deleted successfully."}))
        .catch(err => {
            return res.status(500).send({
                message: err.message
            });
        });
};

exports.deleteOne = (req, res) => {
    note.deleteOne(req.params.noteId)
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