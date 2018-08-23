const os = require('os');

module.exports = (os.platform() == 'darwin') ?
{
    url: 'http://localhost:8083/notes'
} : {
    url: 'http://springb-easy-notes-app:8083/notes'
};