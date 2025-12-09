// const models = require('../models');

// const { Room } = models;

// const getUsers = async (req, res) => {
//   try {
//     // TODO: Figure out what to put into name
//     // const query = { name:  };
//     const docs = await Room.find(query).select('users').lean().exec();

//     return res.json({ users: docs });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: 'Error retrieving users!' });
//   }
// };
