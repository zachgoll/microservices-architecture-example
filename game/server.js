var express = require('express');
var app = express();
var cors = require('cors');
var mongoose = require('mongoose');
var Game = require('./data');
var bodyParser = require('body-parser');

// This will allow our presentation layer to retrieve data from this API without
// running into cross-origin issues (CORS)
app.use(cors());
app.use(bodyParser.json());

// Connect to running database
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PW}@127.0.0.1:27017/test_db_2`, 
    {useNewUrlParser: true});

// Register API Call
app.post('/score', function(req, res, next) {

    const score = req.body.result;
    const winValue = score == "win" ? 1 : 0;
    const lossValue = score == "loss" ? 1 : 0;
    const email = req.body.email;

    // See if user has posted a score already
    Game.getUserScoresByEmail(email, (err, user) => {
        // If user hasn't posted a score yet, create an entry for their count in the database
        if (!user) {
            Game.createUserWithScore(new Game({
                email: email,
                wins: winValue,
                losses: lossValue
            }), (err, user) => {
                res.status(200).json(user);
            });
        } else {
            // If user already has posted a score, update his/her win and loss count based on result
            Game.updateUserScores(email, winValue, lossValue, (err, count) => {
                res.status(200).json(count);
            });
        }
    });
});

app.get('/score/:email', function (req, res, next) {
    
    Game.getUserScoresByEmail(req.params.email, (err, user) => {
        res.status(200).json(user);
    });
});

app.listen(8082);
console.log("App is running at http://localhost:8082");