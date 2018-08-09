const request = require('request-promise');

exports.findAll = (url) => {
    console.log("Getting all the notes...");

    const options = {
        uri: url,
        json: true
    };

    return request(options);
}

exports.create = (url, body) => {
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
}

exports.findOne = (url) => {
    console.log("Getting an existing note with note id...");

    const options = {
        uri: url,
        json: true
    };

    return request(options);
}

exports.update = (url, body) => {
    console.log("Updating an existing note...");

    const options = {
        method: 'PUT',
        uri: url,
        json: true,
        body: body
    };

    return request(options);
}