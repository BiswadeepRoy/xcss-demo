// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const validator = require('validator');

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowancecd 
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const port = 8000;

const listen = app.listen(port, () => {
    console.log("Server listening at localhost:" + port);
});

//Post call
app.post('/postdata', postProjectData);

// Callback function to complete POST '/postdata'
function postProjectData(req, res) {
    if (validator.isURL(req.body.image)) {
        console.log(validator.isURL(req.body.image))
        projectData = req.body;
        res.send(JSON.stringify({
            'Message': 'Data received successfully recieved'
        }));
    } else {
        res.send(JSON.stringify({
            'Message': 'Image data is corrupted!'
        }));
    }
}

//Get call
app.get('/getdata', getProjectData);

// Callback function to complete GET '/getdata'
function getProjectData(req, res) {
    console.log(projectData);
    res.send(JSON.stringify(projectData));
}