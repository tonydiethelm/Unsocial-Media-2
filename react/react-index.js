/*What I need this to do...
    I need it to build a dom based on the contents of my hard drive. 
    I'll use a module to get the contents of my hard drive and return it as an object.
*/

//setup stuff
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './react-style.css';
const startingDirectory = '~/Public';
//const getDirectoryContents = require('./getDirectoryContents.js');  Not doing this here, do in express middleware. 


//testing div, need to make sure this works at all. 
const Testing = () => {
    return <div>If you can see this, react is working. Yay!</div>;
};


/*PPPPP
What do I need? Let's map this out. 
Given available time, NOT going to set up Redux. :D


App
  Navigation  creates links
    Home
    Up
    Folders/links
  Display     creates pictures and text
  Pictures
    Picture
    Picture
  Text
    text
    text

What needs to be in state?
    I need the root directory
    I need the directory to show.
    I need "up one directory".
    I need  folders for navigation, pictures for pictures, text for text. 

app class with constructor, state, and click functions, navigation div, display div. 
navigation
links
display
picture
text

What's my data flow? 
Someone clicks on a link... 
does a get with params/query to backend... 
runs through middleware to get directory map...
comes back to react as reply, change state with it.


*/

class App extends Component {
    constructor(){
        super();     //Do I really need this? 
        this.state = {
            topDirectory: startingDirectory,
            directoryToShow: startingDirectory,
            upOneDirectory: '',
            folders: '',//getDirectoryContents(startingDirectory).listDirectories,
            pictures: '',//getDirectoryContents(startingDirectory).listPictures,
            text: '',//getDirectoryContents(startingDirectory).listText,
        }
        //bind functions to this here.
    }

    //Add functions here. 


    //render next elements here. 
    render() {
        return(
            <div id="app">
                <div id="navigation"> This is going to be a navigation bar. I need to read up on those. 
                    <Links 
                        name={this.state.directoryToShow}
                        directory={this.state.directoryToShow}
                    />
                </div>
                <div id="display"> This is going to be the main display. It will hold pictures and text.
                    <Pictures
                        name={this.state.directoryToShow}
                        src={this.state.directoryToShow}
                    />
                    <Text
                        filePath={this.state.directoryToShow}
                    />
                </div>
            </div>
        )
    }

}

class Links extends Component{
    render() {
        return(
            <div className="link"> This is going to be a button.
                <button>
                {/* Going to need an onclick/eventhandler and going to need to be passed a folder name and directory? */}
                </button>
               
            </div>
        )
    }
}

class Pictures extends Component{
    render() {
        return(
            <div className="picture"> This is going to be a picture. 
                {/* Going to need an IMG tag with a directory path to the picture. */}
            </div>
            )
    }
}

class Text extends Component{
    render() {
        return(
            <div className="text"> This is going to be a box full of text. 
                {/* Going to need directory to text file, fill this with the text. */}
            </div>
            )
    }
}




//Render to the dom. 
ReactDOM.render(<App />,document.getElementById('root'));
