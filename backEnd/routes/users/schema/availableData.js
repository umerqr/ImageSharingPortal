const mongoose = require('mongoose');

const availableData = mongoose.Schema({
  url: { type: String, required: true },
});
const availableDataModel = mongoose.model('availableDataModel', availableData);

module.exports = {
  availableDataModel,
};
