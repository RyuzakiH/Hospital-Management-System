//const mongoose = require("mongoose");
const express = require("express");
//var cors = require("cors");
const bodyParser = require("body-parser");
//const logger = require("morgan");
//const Data = require("./models/data");
//const Doctor = require("./models/doctor");
const Nurse = require("../models/nurse");

//const API_PORT = 3001;
const app = express();
//app.use(cors());
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());



router.get("/nurses", (req, res) => {
    Nurse.find((err, nurse) => {
        return res.json(nurse);
    });
});

// Gets a single nurse from the database
router.get("/nurses/:id", function (req, res) {
    const id = { id: req.params.id };
    Nurse.findOne(id, function (err, nurse) {
        return res.json(nurse);
    });
});

router.put("/nurses/:id", (req, res) => {
    const id = { id: req.params.id };
    const update = req.body;
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



module.exports = router;