const request = require('request-promise');

exports.findAll = (url) => {
    console.log("Getting all the notes...");

    const options = {
        uri: url + '/notes',
        json: true
    };

    return request(options);
}

exports.create = (url, body) => {
    console.log("Creating a new notes...");

    const options = {
        method: 'POST',
        uri: url + '/notes',
        headers: {
            'Content-Type': 'application/json'
        },
        json: true,
        body: body
    };

    return request(options);
}