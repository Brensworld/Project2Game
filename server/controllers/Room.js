// const models = require('../models');
const AccountModel = require('../models/Account');
const RoomModel = require('../models/Room');

// const { Room } = models;

const getUsers = async (req, res) => {
  try {
    // TODO: Figure out what to put into name
    const query = { _id: req.session.account._id };
    const user = await AccountModel.findOne(query);
    const roomName = user.room;
    const docs = await RoomModel.findOne({ name: roomName }).select('users').lean().exec();

    const { users } = docs;
    console.log(users);

    return res.json({ users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving users!' });
  }
};

module.exports = {
  getUsers,
};
