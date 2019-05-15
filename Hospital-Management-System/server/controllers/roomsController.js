const express = require("express");
const bodyParser = require("body-parser");
const Room = require("../models/room");
const shared = require("../shared");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/rooms", (req, res) => {
  Room.find((err, data) => {
     if (err) return res.json({ success: false, error: err });
    return res.json(data);
  });
});

// Gets a single room from the database
router.get("/rooms/:id", function (req, res) {
    const id = { id: req.params.id };
    Room.findOne(id, function (err, room) {
        return res.json(room);
    });
});

router.put("/rooms/:id", (req, res) => {
    const id = { id: req.params.id };
    const update = req.body;
    Room.findOneAndUpdate(id, update, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.post("/rooms", (req, res) => {
    let room = new Room();
    const { number } = req.body;
    room.id = (shared.maxRoomId += 1);
    room.number = number;

    room.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.delete("/rooms/:id", (req, res) => {
    const id = { id: req.params.id };
    Room.findOneAndDelete(id, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});



module.exports = router;
