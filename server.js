var express = require("express");
var path = require("path");
var persons = require("./app/data/friends");

var app = express();
var PORT = 8080;

var htmlRoutes = require('./app/routing/htmlRoutes');
app.use('/', htmlRoutes);

var apiRoutes = require('./app/routing/apiRoutes')
app.use('/api/', apiRoutes);


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});