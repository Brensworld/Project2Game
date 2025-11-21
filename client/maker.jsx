const helper = require('./helper.js');
const React=require('react');
const { useState, useEffect }=React;
const { createRoot }=require('react-dom/client');


const App=()=>{

    return(
        <div>
        </div>
    );
};

const init=()=>{
    const root=createRoot(document.getElementById('app'));
    root.render(<App />);
};

window.onload=init;