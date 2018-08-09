const request = require('request-promise');

exports.findAll = (url) => {
    console.log("Getting all the notes...");

    const options = {
        uri: url + '/notes',
        json: true
    };

    return request(options);
}