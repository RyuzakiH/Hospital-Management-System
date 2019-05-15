const express = require("express");
const Doctor = require("../models/doctor");
const shared = require("../shared");

const router = express.Router();

// this is our Doctors get method
// this method fetches all available data in our database
router.get("/doctors", (req, res) => {
    Doctor.find((err, doctors) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(doctors);
    });
});

// Gets a single doctor from the database
router.get("/doctors/:id", function (req, res) {
    const id = { id: req.params.id };
    Doctor.findOne(id, function (err, doctor) {
        if (err) return res.json({ success: false, error: err });
        return res.json(doctor);
    });
});

// this is our Doctor update method
// this method overwrites existing Doctor in our database
router.put("/doctors/:id", (req, res) => {
    const id = { id: req.params.id };
    const update = req.body;
    Doctor.findOneAndUpdate(id, update, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// this is our Doctor delete method
// this method removes existing doctor in our database
router.delete("/doctors/:id", (req, res) => {
    const id = { id: req.params.id };
    Doctor.findOneAndDelete(id, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

//this is our create doctor method
//this methode adds a new doctor in our database
router.post("/doctors", (req, res) => {
    let doctor = new Doctor();

    const { name, phone, spec, } = req.body;
    
    doctor.id = (shared.maxDoctorId += 1);
    doctor.name = name;
    doctor.phone = phone;
    doctor.spec = spec;

    doctor.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

module.exports = router;