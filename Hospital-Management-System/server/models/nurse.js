const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's nurse structure
const nurseSchema = new Schema({
    id: Number,
    name: String,
    mobile: Number,
    address: String,
    gender: String
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("nurse", nurseSchema);
