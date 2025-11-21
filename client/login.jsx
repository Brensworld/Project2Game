const helper=require('./helper.js');
const React=require('react');
const {createRoot}=require('react-dom/client');

const handleLogin=(e)=>{
    e.preventDefault();
    helper.hideError();

    const username=e.target.querySelector('#user').value;
    const pass=e.target.querySelector('#pass').value;

    if(!username || !pass){
        helper.handleError('Username or password is empty!');
        return false;
    }

    helper.sendPost(e.target.action,{username,pass});
    return false;
}

const handleSignup=(e)=>{
    e.preventDefault();
    helper.hideError();

    const username=e.target.querySelector('#user').value;
    const pass=e.target.querySelector('#pass').value;
    const pass2=e.target.querySelector('#pass2').value;

    if(!username || !pass || !pass2){
        helper.handleError('All fields are required!');
        return false;
    }

    if(pass !== pass2){
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action,{username,pass,pass2});

    return false;
}

const handlePassChange=(e)=>{
    e.preventDefault();
    helper.hideError();

    const username=e.target.querySelector('#user').value;
    const oldPass=e.target.querySelector('#oldPass').value;
    const newPass=e.target.querySelector('#newPass').value;
    const newPass2=e.target.querySelector('#newPass2').value;

    if(!username || !oldPass || !newPass || !newPass2){
        helper.handleError('All fields are required!');
        return false;
    }

    if(newPass !== newPass2){
        helper.handleError('New passwords do not match!');
        return false;
    }

    if(newPass === oldPass){
        helper.handleError('New password must be new!');
        return false;
    }

    helper.sendPost(e.target.action,{username,oldPass,newPass,newPass2});

    return false;
}


const LoginWindow=(props)=>{
    return(
        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className='mainForm'
            >
                <label htmlFor='username'>Username: </label>
                <input id="user" type='text' name='username' placeholder='username'/>
                <label htmlFor='pass'>Password: </label>
                <input id="pass" type='password' name='pass' placeholder='password'/>
                <input className='formSubmit' type='submit' value="Sign in"/>
            </form>
    )
}

const SignupWindow=(props)=>{
    return(
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className='mainForm'
            >
                <label htmlFor='username'>Username: </label>
                <input id="user" type='text' name='username' placeholder='username'/>
                <label htmlFor='pass'>Password: </label>
                <input id="pass" type='password' name='pass' placeholder='password'/>
                <label htmlFor='pass'>Password: </label>
                <input id="pass2" type='password' name='pass2' placeholder='retype password'/>
                <input className='formSubmit' type='submit' value="Sign up"/>
            </form>
    )
}

const PassChangeWindow=(props)=>{
    return(
        <form id="passChangeForm"
            name='passChangeForm'
            onSubmit={handlePassChange}
            action="/passChange"
            method="POST"
            className='mainForm'
        >
            <label htmlFor='username'>Username: </label>
            <input id="user" type='text' name='username' placeholder='username'/>
            <label htmlFor='oldPass'>Old Password: </label>
            <input id="oldPass" type='password' name='oldPass' placeholder='old password'/>
            <label htmlFor='newPass'>New Password: </label>
            <input id="newPass" type='password' name='newPass' placeholder='new password'/>
            <label htmlFor='newPass'>New Password: </label>
            <input id="newPass2" type='password' name='newPass2' placeholder='retype new password'/>
            <input className='formSubmit' type='submit' value="Change Password"/>

        </form>
    )
}


const init=()=>{
    const loginButton=document.getElementById('loginButton');
    const signupButton=document.getElementById('signupButton');
    const passChangeButton=document.getElementById('passChangeButton');


    const root=createRoot(document.getElementById('content'));

    loginButton.addEventListener('click',(e)=>{
        e.preventDefault();
        root.render(<LoginWindow/>);
        return false;
    });

    signupButton.addEventListener('click',(e)=>{
        e.preventDefault();
        root.render(<SignupWindow/>);
        return false;
    });

    passChangeButton.addEventListener('click',(e)=>{
        e.preventDefault();
        root.render(<PassChangeWindow/>);
        return false;
    })

    root.render(<LoginWindow/>);
};

window.onload=init;