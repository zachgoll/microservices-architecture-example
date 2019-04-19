var express = require('express');
var app = express();
var cors = require('cors');
var mongoose = require('mongoose');
var User = require('./data');
var bodyParser = require('body-parser');

// This will allow our presentation layer to retrieve data from this API without
// running into cross-origin issues (CORS)
app.use(cors());
app.use(bodyParser.json());

// Connect to running database
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PW}@127.0.0.1:27017/test_db_2`, 
    {useNewUrlParser: true});

// Register API Call
app.post('/register', function(req, res, next) {
    
    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    });
    
    User.createUser(newUser, (err, user) => {
        res.status(200).json(user);
    });
});

app.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (error, user) => {
        if (user && user.password == password) {
            // User entered the correct password and we should authenticate them!
            res.status(200).json({ authenticated: true });
        } else {
            // User entered the wrong password
            res.status(200).json({ authenticated: false });
        }
    });

});

app.get('/get-user/:useremail', function(req, res) {
    User.getUserByEmail(req.params.useremail, (error, user) => {
        res.status(200).json({ email: user.email, password: user.password });
    });    
});

app.listen(8081);
console.log("App is running at http://localhost:8081");