/*What I need this to do...
    I need it to build a dom based on the contents of my hard drive. 
    I'll use a module to get the contents of my hard drive and return it as an object.
*/

//setup stuff
import React from 'react';
import ReactDOM from 'react-dom';

//testing div, need to make sure this works at all. 
const Testing = () => {
    return <div>If you can see this, react is working. Yay!</div>;
};

//Render to the dom. 
ReactDOM.render(<Testing />,document.getElementById('root'));
