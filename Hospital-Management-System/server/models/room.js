// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const RoomSchema = new Schema(
  {
    id: Number,
    number: Number
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Room", RoomSchema);
