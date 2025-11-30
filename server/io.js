// Taken from Austin Willoughby's in class demo on socket.io

const http = require('http');
const { Server } = require('socket.io');
const { models } = require('mongoose');
const RoomModel = require('./models/Room');

const { Room } = models;

let io;

const handleChatMessage = (socket, msg) => {
  socket.rooms.forEach((room) => {
    if (room === socket.id) return;

    io.to(room).emit('chat message', msg);
  });
};

const handleRoomChange = async (socket, roomName) => {
  socket.rooms.forEach(async(room) => {
    if (room === socket.id) return;
    socket.leave(room);
    try{
        const oldRoom=await RoomModel.findOne({name:room}).exec();
        let oldUsers=oldRoom.users;
        oldUsers.pull('test');

        await RoomModel.findOneAndUpdate(
            {name: room},
            {$set: {users: oldUsers}},
            {new: true}
        );
    }catch(err){
        console.log(err);
    }

  });
  socket.join(roomName);

  try {
    const currentRoom = await RoomModel.findOne({ name: roomName }).exec();
    if (!currentRoom) {
      const newRoom = new Room({ name: roomName });
      await newRoom.save();
    }
    
    let tempUsers=currentRoom.users;
    tempUsers.push('test');
    
    await RoomModel.findOneAndUpdate(
        {name: roomName},
        {$set: {users: tempUsers}},
        { new: true }
    );
  } catch (err) {
    console.log(err);
  }
};

const socketSetup = (app) => {
  const server = http.createServer(app);
  io = new Server(server);

  io.on('connection', async (socket) => {
    console.log('a user connected');

    /* Here we automatically put all new users into the general room. */
    socket.join('general');
    try {
      const currentRoom = await RoomModel.findOne({ name: 'general' }).exec();
      if (!currentRoom) {
        const newRoom = new Room({ name: 'general' });
        await newRoom.save();
      }
    } catch (err) {
      console.log(err);
    }

    socket.on('disconnect', () => {
      console.log('a user disconnected');
    });

    /* We need to pass down the current socket into each of these
           handler functions. Be aware that we can't globalize socket
           in this file otherwise it will be overwritten each time a
           new user connects. It is easier and far safer to simply pass
           it down into our handler functions in this way.
        */
    socket.on('chat message', (msg) => handleChatMessage(socket, msg));
    socket.on('room change', (room) => handleRoomChange(socket, room));
  });

  return server;
};

module.exports = socketSetup;
