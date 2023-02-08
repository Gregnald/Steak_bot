// db.js
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MTOKEN;

mongoose.set('strictQuery', false);


mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;
