const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  balance: String,
  picture: String,
  age: Number,
  name: { type: String, required: true },
  gender: String,
  company: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: [String], required: true },
});
const userModel = mongoose.model('userModel', userSchema);

module.exports = {
  userModel,
};
