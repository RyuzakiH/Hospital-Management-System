const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");
const Doctor = require("./doctor");
const Nurse = require("./nurse");

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  "mongodb+srv://admin:admin@cluster0-yual5.mongodb.net/test?retryWrites=true";

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

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

router.get("/nurses", (req, res) => {
  Nurse.find((err, nurse) => {
    return res.json(nurse);
  });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get("/nurses/:id", function(req, res) {
  Nurse.findById(req.params.id, function(err, nurse) {
    return res.json(nurse);
  });
});

router.put("/nurses/:id", (req, res) => {
  const { id, update } = req.body;
  Nurse.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post("/nurses", (req, res) => {
  let nurse = new Nurse();
  const { id, name, address, mobile, gender } = req.body;
  nurse.name = name;
  nurse.id = id;
  nurse.address = address;
  nurse.mobile = mobile;
  nurse.gender = gender;
  nurse.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete("/nurses/:id", (req, res) => {
  const id = { id: req.params.id };
  Nurse.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
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
