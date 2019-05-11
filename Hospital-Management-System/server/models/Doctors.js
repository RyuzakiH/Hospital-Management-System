// /backend/Doctors.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DoctorSchema = new Schema(
  {
    id: Number,
    name: String,
    phone: String,
    spec: String,
  },
  //{ timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Doctors", DoctorSchema);