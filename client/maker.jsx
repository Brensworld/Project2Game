const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');
const RoomModel = require('../server/models/Room.js');

const { Application, extend } = require('@pixi/react')

// import '@pixi/unsafe-eval';
const {
    Container,
    Graphics,
    Sprite,
} = require('pixi.js');

extend({
    Container,
    Graphics,
    Sprite,
});


const socket = io();




const handleEditBox = () => {
    const editForm = document.getElementById('editForm');
    const editBox = document.getElementById('editBox');

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (editBox.value) {
            /* Unlike in the basic demo, we are reverting to only
               sending simple text messages to the 'chat message'
               event channel, since the server will handle the
               messaging channel for us.
            */
            socket.emit('chat message', editBox.value);
            editBox.value = '';
        }

        return false;
    });
};

const displayMessage = (msg) => {
    const messageDiv = document.createElement('div');
    messageDiv.innerText = msg;
    document.getElementById('messages').appendChild(messageDiv);
}

const displayUsers = () => {
    const channelSelect = document.getElementById('channelSelect');
    const roomName = channelSelect.value;
    const users = RoomModel.findOne({ name: roomName }).users;

    console.log(users);


}

const handleChannelSelect = () => {
    const channelSelect = document.getElementById('channelSelect');
    const messages = document.getElementById('messages');
    const roomInfo = document.getElementById('roomInfo');

    /* In the basic demo, we used this change event listener to
       selectively listen to specific channels and not listen to
       others. Instead, we will just tell our socket server that
       we want to change channels. We will do this by emitting the
       name of the channel we want to join to the 'room change'
       event channel. Server-side, we will handle that event by
       putting this user in the correct room. As a result, we can 
       just listen to the 'chat message' event channel because we 
       will only recieve updates for the rooms that we are in.
    */
    channelSelect.addEventListener('change', () => {
        const roomName = channelSelect.value;
        messages.innerHTML = '';
        roomInfo.innerHTML = `You are in the ${roomName} room.`
        const username = helper.getCookie('username');
        socket.emit('room change', roomName, username);
        // displayUsers();
    });
}

const App = () => {

    return (
        <div>
            <Application width={200} height={200} backgroundColor={0x1099bb} autoStart>
                <pixiGraphics
                    x={0}
                    y={0}
                    draw={(graphics) => {
                        graphics.setFillStyle({ color: 'red' });
                        graphics.rect(0, 0, 25, 25);
                    }}
                />
            </Application>
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));

    handleEditBox();

    const roomInfo = document.getElementById('roomInfo');
    const channelSelect = document.getElementById('channelSelect');
    roomInfo.innerHTML = `You are in the ${channelSelect.value} room.`;

    socket.on('chat message', displayMessage);
    handleChannelSelect();

    const username = helper.getCookie('username');
    socket.emit('room change', 'general', username);

    root.render(<App />);
};

window.onload = init;

