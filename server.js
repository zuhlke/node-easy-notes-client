const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organise and keep track of all your notes."});
});

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});

require('./app/routes/note.routes.js')(app);