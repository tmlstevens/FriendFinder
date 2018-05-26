var express = require('express');
var router = express.Router();
var path = require("path");

// module.exports = function(app) {

router.use(function timeLog (request, response, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/', function(request, response, next) {
    var options = {
        root: path.join(__dirname + '/../public'),
    };
    var fileName = 'home.html';
    response.sendFile(fileName, options, function (error) {
        if (error) {
            next(error);
        } else {
            console.log('Sent:', fileName);
        }
    })
});

router.get('/:name', function (request, response, next) {
    var options = {
        root: path.join(__dirname + '/../public'),
    };
    var fileName = request.params.name + '.html';
    response.sendFile(fileName, options, function (error) {
        if (error) {
            next(error);
        } else {
            console.log('Sent:', fileName);
        }
    })
});
// }

module.exports = router
