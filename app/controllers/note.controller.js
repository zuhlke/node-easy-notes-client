const request = require('request-promise');
const service = require('../services/note.services.js');

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Note cannot be empty."
        });
    }

    request('http://easy-notes-app:8080/notes', req.body).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while create note."
        });
    });
};

exports.findAll = (req, res) => {
    service.findAll('http://easy-notes-app:8080/notes').then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.findOne = (req, res) => {
    service.findOne('http://easy-notes-app:8080/notes/' + req.params.noteId).then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send(note);
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

    service.update('http://easy-notes-app:8080/notes/' + req.params.noteId, req.body).then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        return res.status(500).send({
            message: err.message
        });
    });
};

exports.delete = (req, res) => {
    const options = {
        method: 'DELETE',
        uri: 'http://easy-notes-app:8080/notes/' + req.params.noteId,
        json: true
    };

    request(options)
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