const mongoose = require('mongoose');

let RoomModel = {};

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  users: {
    type: [String],
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

RoomModel = mongoose.model('Room', RoomSchema);

module.exports = RoomModel;
