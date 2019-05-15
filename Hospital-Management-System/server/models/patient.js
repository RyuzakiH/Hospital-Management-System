const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const Doctor = require("./doctor");

const patientSchema = new Schema({
    id: { type: Number, default: 0, unique: true },
    name: String,
    mobile: String,
    address: String,
    gender: String,
    disease: String,

    admitted: Boolean,
    dateAdmitted: Date,
    dateDischarged: Date,

    //doctor: { type: mongoose.Schema.Types.ObjectId, ref: Doctor }
    doctorId: Number,
    nurseId: Number,
    roomId: Number,
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("patient", patientSchema);

