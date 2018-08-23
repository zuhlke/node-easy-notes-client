const os = require('os');

module.exports = (os.platform() == 'darwin') ?
{
    url: 'http://localhost:8082/notes'
} : {
    url: 'http://easy-notes-app:8082/notes'
};