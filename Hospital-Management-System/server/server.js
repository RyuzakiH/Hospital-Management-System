const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
require("./db");
require("./shared");

const API_PORT = 3001;
const app = express();
app.use(cors());

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

var patientsController = require('./controllers/patientsController');
var doctorsController = require('./controllers/doctorsController');
var nursesController = require('./controllers/nursesController');
var roomsController = require('./controllers/roomsController');

app.use('/api', patientsController);
app.use('/api', doctorsController);
app.use('/api', nursesController);
app.use('/api', roomsController);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));