var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');



var end = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

//Middlewares
app.use(logger('dev'));
app.use(bodyParser());
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
))

app.use(express.static(__dirname + '/public'));

app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res) {
    res.render('index');
});


mongoose.connect('mongodb://localhost/multivision');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
   console.log('multivision db opened');
});

var port = 3030;

app.listen(port);
console.log('Listening on port ' + port);