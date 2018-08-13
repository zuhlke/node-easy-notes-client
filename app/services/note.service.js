const request = require('request-promise');

exports.noteService = (url) => {
    return {
        findAll: () => {
            console.log("Getting all the notes...");

            const options = {
                uri: url,
                json: true
            };

            return request(options);
        },

        create: (body) => {
            console.log("Creating a new note...");

            const options = {
                method: 'POST',
                uri: url,
                headers: {
                    'Content-Type': 'application/json'
                },
                json: true,
                body: body
            };

            return request(options);
        },

        findOne: (id) => {
            console.log("Getting an existing note with note id:", id);

            const options = {
                uri: url + '/' + id,
                json: true
            };

            return request(options);
        },

        update: (id, body) => {
            console.log("Updating an existing note with note id:", id);

            const options = {
                method: 'PUT',
                uri: url + '/' + id,
                json: true,
                body: body
            };

            return request(options);
        },

        deleteAll: () => {
            console.log("Deleting all notes...");

            const options = {
                method: 'DELETE',
                uri: url,
                json: true
            };

            return request(options);
        },

        deleteOne: (id) => {
            console.log("Deleting an existing note with note id:", id);

            const options = {
                method: 'DELETE',
                uri: url + '/' + id,
                json: true
            };

            return request(options);
        }

    };
}
