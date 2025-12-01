const {createRoot}=require('react-dom/client');
const React=require('react');
const helper=require('./helper.js')

const handleAlienChange=(e)=>{
    e.preventDefault();
    
    const form=document.getElementById('alienForm');
    const radios=form.elements["alienSelect"];
    const alien=radios.value;
    const username=helper.getCookie('username');

    helper.sendPost(e.target.action,{username, alien});
}


const AlienForm=(props)=>{
    return(
        <form action="/changeAlien" method="POST" id='alienForm' onSubmit={handleAlienChange}>
        <input type="radio" id='greenAlien' name="alienSelect" value="/assets/img/ailyun.png"/>
        <label for="greenAlien">Green</label>
        <img id="greenAlienImg" src="/assets/img/ailyun.png" alt="green alien" widht="128" height="128"/>

        <input type="radio" id='blueAlien' name="alienSelect" value="/assets/img/blooailyun.png"/>
        <label for="blueAlien">Blue</label>
        <img id="blueAlienImg" src="/assets/img/blooailyun.png" alt="blue alien" widht="128" height="128"/>

        <input type="submit" value="Submit"/>
    </form>
    )
}


const init=()=>{
    const root=createRoot(document.getElementById('content'));

    root.render(<AlienForm/>)
}

window.onload=init;