const request = require('request-promise');
const url = 'http://localhost:8989';

exports.findAll = () => {
    console.log("Getting all the notes...");

    const options = {
        uri: url + '/notes',
        json: true
    };

    return request(options);
}