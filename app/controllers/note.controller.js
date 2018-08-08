const request = require('request-promise');

exports.create = (req, res) => {
    console.log("Creating a note...");
    console.log(req);

    if(!req.body) {
        return res.status(400).send({
            message: "Note cannot be empty."
        });
    }

    const options = {
        method: 'POST',
        uri: 'http://localhost:3000/notes',
        json: true,
        body: req.body
    };

    request(options)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while create note."
        });
    });
};

exports.findAll = (req, res) => {
    const options = {
        uri: 'http://localhost:3000/notes',
        json: true
    };

    request(options)
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.findOne = (req, res) => {
    const options = {
        uri: 'http://localhost:3000/notes/' + req.params.noteId,
        json: true
    };

    request(options)
    .then(note => {
        if(!note) {
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
    if(!req.body) {
        return res.status(400).send({
            message: "Note can not be empty."
        });
    }

    const options = {
        method: 'PUT',
        uri: 'http://localhost:3000/notes/' + req.params.noteId,
        json: true,
        body: req.body
    };


    request(options)
    .then(note => {
        if(!note) {
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
        uri: 'http://localhost:3000/notes/' + req.params.noteId,
        json: true
    };

    request(options)
    .then(response => {
        if(!response) {
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