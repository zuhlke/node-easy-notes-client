const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'pug');

// app.get('/', (req, res) => {
//     res.render('index', {
//         title: 'Easy Notes',
//         message: 'Welcome to EasyNotes client. Take notes quickly. Organise and keep track of all your notes.'
//     });
// });

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});

require('./app/routes/note.routes.js')(app);

