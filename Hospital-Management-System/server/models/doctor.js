const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's doctor structure 
const doctorSchema = new Schema(
    {
        id: Number,
        name: String,
        phone: String,
        spec: String
    }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("doctor", doctorSchema);