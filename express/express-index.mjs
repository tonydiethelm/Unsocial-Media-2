/* What this needs to do:
  I need to serve static files in public folder
  I need to respond to requests for directory mappings with appropriate middleware. 
  I need to handle wrong URIs
  I need to handle errors
  Actually call the HTTP server. This should be last. 



*/

//setup stuff
//path setup
import path from 'node:path';
//express setup
import express from 'express';
const app = express();
const port = 3000;
//Caution! We are inside server dir here. Set pathnames accordingly.
let Directory = '/home/tony/Public'
const publicDirectory = path.join(__dirname, '../public');
//automagically destring incoming JSON
app.use(express.json());
//require my middleware
import holler from '@tonydiethelm/holler';
import getText from './getText.mjs';
import makeLinks from './makeLinks.mjs';
import mapMyDirectory from './mapMyDirectory.mjs';



//static serve the HTML/CSS/JS
app.use('/', 
holler, 
express.static(publicDirectory))

//static serve the files from the HD.


//test response for initial functionality. 
app.get('/test', 
  holler,
  (request, response) => {
    response.status(200).send('Testing Testing, express is functioning. Is nodemon? Yes. ')
});

//handle requests for base app created by react and bundled by html webpack plugin. 
//this isn't served here and doesn't work. It never goes through this, because it's served off the 
//webdev server on 8080. Can't proxy back, or it won't get the react stuff. Annoying... 
//So, will have to build up app in base react, and handle requests off a separate URI. 
// app.get('/', 
//   holler,
//   (request, response) => {
//     response.status(200).sendFile(mainFile)
// });

//handle requests to get directory mappings.
app.post('/directoryMapping', 
  holler,
  mapMyDirectory,
  makeLinks,
  getText,
  // holler,
  (request, response) => {
    response.status(200).send(response.locals.mapping)
});

//handle wrong URIs
app.use('*', 
  //holler,
  (request, response) => {
    response.status(404).json('Sorry, we don\'t have that here.')
});

//handle errors

//Call the HTTP server 
app.listen(port, () => {
  console.log('Server listening on port: ' + port);
 });