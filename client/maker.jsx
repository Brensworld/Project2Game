const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');
const RoomModel = require('../server/models/Room.js');

const { Application, extend, useTick } = require('@pixi/react')


// import '@pixi/unsafe-eval';
const {
    Container,
    Graphics,
    Sprite,
    Assets,
    Texture
} = require('pixi.js');

extend({
    Container,
    Graphics,
    Sprite,
});

const keyboard = Object.freeze({
    SPACE: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    // W: 87,
    // A: 65,
    // S:83,
    // D:68,
});

const keys = {
    32: false,
    36: false,
    38: false,
    39: false,
    40: false,
}

// let alienX = 100;
// let alienY = 100;
let alienSpeed = 10;

const socket = io();

const AlienSprite = (props) => {
    const [alienURL, setAlien] = useState(props.alienURL);
    
    const spriteRef = React.useRef(null)

    const [texture, setTexture] = React.useState(Texture.EMPTY)
    const [alienPos, setPosition] = React.useState({ x: 100, y: 100 })

    useEffect(() => {
        const loadAlienURL = async () => {
            const response = await fetch('/getAlien');
            const data = await response.json();
            setAlien(data.alien);
        };
        loadAlienURL();
        
    }, []);

    props.triggerReload();
    

    




    // Preload the sprite if it hasn't been loaded yet
    useEffect(() => {
        if (texture === Texture.EMPTY && alienURL && alienURL!=="") {
            console.log(alienURL);
            Assets
                .load(alienURL)
                .then((result) => {
                    setTexture(result)
                });
        }
    }, [texture,props.reloadAlien]);

    //loop for alien
    //help obtained from example: https://www.youtube.com/watch?v=zwKt-H09cU4
    useTick(() => {

        setPosition((prev) => {
            const { x, y } = prev

            let dx = 0;
            let dy = 0;

            // console.log("Alien tick");
            if (keys[keyboard.RIGHT]) {

                dx += alienSpeed;

            }
            if (keys[keyboard.LEFT]) {

                dx -= alienSpeed
            }

            if (keys[keyboard.DOWN]) {

                dy += alienSpeed
            }
            if (keys[keyboard.UP]) {

                dy -= alienSpeed
            }

            if (y + dy < 0) {
                dy += 400;
            }
            if (y + dy > 400) {
                dy -= 400;
            }

            if (x + dx < 0) {
                dx += 600;
            }
            if (x + dx > 600) {
                dx -= 600;
            }

            return { x: x + dx, y: y + dy }
        })

    });

    return (
        <pixiSprite
            ref={spriteRef}
            anchor={0.5}
            eventMode={'static'}
            scale={0.125}
            texture={texture}
            x={alienPos.x}
            y={alienPos.y} />
    );
}




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
    const [reloadAlien, setReloadAlien] = useState(false);

    return (
        <div>
            <Application width={600} height={400} backgroundColor={0x1099bb} autoStart id="pixiApp">
                <AlienSprite alienURL="" reloadAlien={reloadAlien}  triggerReload={()=>setReloadAlien(!reloadAlien)} />
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

window.onkeyup = (e) => {
    // console.log("keyup=" + e.keyCode);
    keys[e.keyCode] = false;
    e.preventDefault();
};

window.onkeydown = (e) => {
    // console.log("keydown=" + e.keyCode);
    keys[e.keyCode] = true;

};

