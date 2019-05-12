const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
//const Data = require("./data");
const Doctor = require("./models/doctor");
const Nurse = require("./models/nurse");

var db = require("./db");

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));


var nursesController = require('./controllers/nursesController');
app.use('/api', nursesController);

var roomsController = require('./controllers/roomsController');
app.use('/api', roomsController);




// this is our get method
// this method fetches all available data in our database
router.get("/patients", (req, res) => {
  Data.find((err, data) => {
    // if (err) return res.json({ success: false, error: err });
    return res.json(data);
  });
});

router.get("/doctors", (req, res) => {
  Doctor.find((err, data) => {
    return res.json(data);
  });
});


// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/doctors", (req, res) => {
  let doctor = new Doctor();

  const { id, name } = req.body;

  // if ((!id && id !== 0) || !name) {
  //   return res.json({
  //     success: false,
  //     error: "INVALID INPUTS"
  //   });
  // }
  doctor.name = name;
  doctor.id = id;
  doctor.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
