const { model, Schema } = require('mongoose');
const environment = require('../utils/constants');
const connectDB = require('../utils/mongodb/connect');

// MongoDB Connection Established
connectDB(environment.DB_URL);


const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
});

const User = model('User', UserSchema);
module.exports = {User};