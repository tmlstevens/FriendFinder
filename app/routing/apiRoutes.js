var express = require('express');
var router = express.Router();
var path = require("path");
var bodyParser = require("body-parser");
var friendsData = require("../data/friends");
var friends = friendsData.friends;

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(function timeLog (request, response, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get("/friends", function(request, response) {
    response.json(friendsData);
})

router.post("/friends", function(request, response) {
    var scores = request.body.scores;
    var userScoresArr = [];
    var friendScoreArr = [];
    var scoreDiffArr = [];
    var matchArr = []
    var scoreSum = 0;

    // loop through and sum the user's total score
    for (var i = 0; i < scores.length; i++) {
        scoreSum = parseInt(scores[i]) + parseInt(scoreSum);
    };

    //loop through each possible friend
    for (var j = 0; j < friends.length; j++) {
        var friendScoreSum = 0;

        // for each possible friend, sum the total score
        for (var k = 0; k < friends[j].scores.length; k++) {
            friendScoreSum = friends[j].scores[k] + friendScoreSum;  
        }

        // get diff between user score and each potential friend's score
        var scoreDiff = Math.abs(scoreSum - friendScoreSum);  

        //push values to arrays
        friendScoreArr.push(friendScoreSum);
        scoreDiffArr.push(scoreDiff);
    };
    // get index position of friend score with lowest diff compared to user
    var matchIndex = friendScoreArr.indexOf(Math.min.apply(Math, friendScoreArr));

    // use matchIndex to get name of best match for user; sexual orientation not considered :(
    var friendMatch = friends[matchIndex];
    console.log(friendMatch);
    // console.log(friendArr);
    // console.log(friendScoreArr);
    // console.log(scoreDiffArr);
    response.send(friendMatch);
})

module.exports = router


