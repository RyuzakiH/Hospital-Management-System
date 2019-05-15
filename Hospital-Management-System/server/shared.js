const Patient = require("./models/patient");
const Doctor = require("./models/doctor");
const Nurse = require("./models/nurse");
const Room = require("./models/room");
//const User = require("./models/user");

var shared = {
    maxNurseId: 0,
    maxDoctorId: 0,
    maxPatientId: 0,
    maxRoomId: 0,
    maxUserId: 0
}

Patient.find((err, patients) => {
    var patient = patients.reduce(function (prev, current) {
        return (prev.id > current.id) ? prev : current
    }, { id: 0 });
    shared.maxPatientId = patient.id;
});

Doctor.find((err, doctors) => {
    var doctor = doctors.reduce(function (prev, current) {
        return (prev.id > current.id) ? prev : current
    }, { id: 0 });
    shared.maxDoctorId = doctor.id;
});

Nurse.find((err, nurses) => {
    var nurse = nurses.reduce(function (prev, current) {
        return (prev.id > current.id) ? prev : current
    }, { id: 0 });
    shared.maxNurseId = nurse.id;
});

Room.find((err, rooms) => {
    var room = rooms.reduce(function (prev, current) {
        return (prev.id > current.id) ? prev : current
    }, { id: 0 });
    shared.maxRoomId = room.id;
});

//Doctor.find(doctors => {
//    var doctor = doctors.reduce(function (prev, current) {
//        return (prev.id > current.id) ? prev : current
//    }, { id: 0 });
//    shared.maxDoctorId = doctor.id;
//});


//console.log(shared);

module.exports = shared;