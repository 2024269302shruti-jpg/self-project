const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Search', searchSchema);
