const mongoose = require('mongoose');

const getMongoConnection = () => {
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useUnifiedTopology', true);
  mongoose.connect(process.env.MONGODB_CONNECTION);
  mongoose.connection.once('open', () => {
    console.log('Connected to database');
  });
};

module.exports = getMongoConnection;
