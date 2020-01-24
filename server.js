var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false})

app.use(express.static(__dirname + '/public'));

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});