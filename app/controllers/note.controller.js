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