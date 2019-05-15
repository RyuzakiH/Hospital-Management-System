const express = require("express");
const Patient = require("../models/patient");
const shared = require("../shared");

const router = express.Router();

// Gets all patients
router.get("/patients", (req, res) => {
    Patient.find((err, patients) => {
        return res.json(patients);
    });
});

// Gets a single patient from the database
router.get("/patients/:id", function (req, res) {
    const id = { id: req.params.id };
    Patient.findOne(id, function (err, patient) {
        if (err) return res.json({ success: false, error: err });
        return res.json(patient);
    });
});

router.put("/patients/:id", (req, res) => {
    const id = { id: req.params.id };
    const update = req.body;
    Patient.findOneAndUpdate(id, update, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// Add new Patient
router.post("/patients", (req, res) => {    
    let patient = new Patient();
    
    patient.id = (shared.maxPatientId += 1);
    patient.name = req.body.name;
    patient.address = req.body.address;
    patient.mobile = req.body.mobile;
    patient.gender = req.body.gender;
    patient.disease = req.body.disease;
    patient.doctorId = req.body.doctorId;
    patient.nurseId = req.body.nurseId;
    patient.roomId = req.body.roomId;
    
    patient.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// delete a patient
router.delete("/patients/:id", (req, res) => {
    const id = { id: req.params.id };
    Patient.findOneAndDelete(id, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});



router.get("/patients/:id/admit", function (req, res) {
    const id = { id: req.params.id };
    const update = {
        admitted: true,
        dateAdmitted: Date.now()
    };
    Patient.findOneAndUpdate(id, update, function (err, patient) {
        if (err) return res.json({ success: false, error: err });
        return res.json(patient);
    });
});

router.get("/patients/:id/discharge", function (req, res) {
    const id = { id: req.params.id };
    const update = {
        admitted: false,
        dateDischarged: Date.now(),
        //nurseId: null,
        //roomId: null
    };
    Patient.findOneAndUpdate(id, update, function (err, patient) {
        if (err) return res.json({ success: false, error: err });
        return res.json(patient);
    });
});


module.exports = router;