const mongoose = require('mongoose');

// User schema for mongodb
const GameSchema = mongoose.Schema({
	email: { type: String },
      wins: { type: Number },
      losses: { type: Number }
}, { collection: 'games' } );

// Define the mongoose model for use below in method
const Game = module.exports = mongoose.model('Game', GameSchema);

module.exports.getUserScoresByEmail = (email, callback) => {
      try {
            Game.findOne({ email: email }, callback);
      } catch (err) {
            callback(err);
      }
};

module.exports.createUserWithScore = (user, callback) => {
      user.save(callback);
};

module.exports.updateUserScores = (email, winValue, lossValue, callback) => {
    try {
          Game.findOne({ email: email }, (err, user) => {
            console.log(user);
            Game.updateOne({ email: email }, { wins: user.wins + winValue, losses: user.losses + lossValue }, callback);
          });
    } catch (err) {
          callback(err);
    }
};