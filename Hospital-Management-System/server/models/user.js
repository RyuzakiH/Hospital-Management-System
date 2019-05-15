const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: { type: Number, default: 0, unique: true },
    name: String,
    mobile: String,
    address: String,
    gender: String,
    disease: String,
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("user", userSchema);