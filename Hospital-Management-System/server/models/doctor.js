const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema(
    {
        id: { type: Number, default: 0, required: true },
        name: String,
        phone: String,
        spec: String
    }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("doctor", doctorSchema);