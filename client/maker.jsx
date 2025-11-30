const helper = require('./helper.js');
const React=require('react');
const { useState, useEffect }=React;
const { createRoot }=require('react-dom/client');


const socket = io();

const handleEditBox = () => {
    const editForm = document.getElementById('editForm');
    const editBox = document.getElementById('editBox');
    const channelSelect = document.getElementById('channelSelect');

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if(editBox.value){
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

const handleChannelSelect = () => {
    const channelSelect = document.getElementById('channelSelect');
    const messages = document.getElementById('messages');

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
        messages.innerHTML = '';
        socket.emit('room change', channelSelect.value);
    });
}

const App=()=>{

    return(
        <div>
        </div>
    );
};

const init=()=>{
    const root=createRoot(document.getElementById('app'));

    handleEditBox();
    
    socket.on('chat message', displayMessage);
    handleChannelSelect();

    root.render(<App />);
};

window.onload=init;