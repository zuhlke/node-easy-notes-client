const os = require('os');

module.exports = (os.platform() == 'darwin') ?
{
    url: 'http://localhost:8080/notes'
} : {
    url: 'http://easy-notes-app:8080/notes'
};