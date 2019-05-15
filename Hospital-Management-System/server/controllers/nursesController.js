const express = require("express");
const Nurse = require("../models/nurse");
const shared = require("../shared");

const router = express.Router();

// Gets all nurses
router.get("/nurses", (req, res) => {
    Nurse.find((err, nurse) => {
        return res.json(nurse);
    });
});

// Gets a single nurse from the database
router.get("/nurses/:id", function (req, res) {
    const id = { id: req.params.id };
    Nurse.findOne(id, function (err, nurse) {
        if (err) return res.json({ success: false, error: err });
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

// Add new nurse
router.post("/nurses", (req, res) => {
    const { name, address, mobile, gender } = req.body;
    
    let nurse = new Nurse();

    nurse.id = (shared.maxNurseId += 1);
    nurse.name = name;
    nurse.address = address;
    nurse.mobile = mobile;
    nurse.gender = gender;

    nurse.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// delete a nurse
router.delete("/nurses/:id", (req, res) => {
    const id = { id: req.params.id };
    Nurse.findOneAndDelete(id, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});



module.exports = router;