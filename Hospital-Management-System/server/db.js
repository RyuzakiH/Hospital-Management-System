const mongoose = require("mongoose");

// this is our MongoDB database
const dbRoute =
    "mongodb+srv://admin:admin@cluster0-yual5.mongodb.net/test?retryWrites=true";

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));
