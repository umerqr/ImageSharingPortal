const mongoose = require('mongoose');

const userData = mongoose.Schema({
  email: { type: String, required: true },
  items: {
    type: [{ url: String, id: { type: String, required: true } }],
    required: true,
  },
});
const userDataModel = mongoose.model('userDataModel', userData);

module.exports = {
  userDataModel,
};
