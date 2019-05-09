import { InputTypes } from './InputTypes';

const patientsTemplate = [
    { name: 'id', display: 'ID', type: InputTypes.NUMBER, readOnly: false, required: true },
    { name: 'name', type: InputTypes.TEXT, readOnly: false, required: true },
    { name: 'mobile', type: InputTypes.TEXT, readOnly: false, required: true },
    { name: 'address', type: InputTypes.TEXT, readOnly: false, required: true },
    { name: 'gender', type: InputTypes.RADIO, readOnly: false, required: true },
    { name: 'disease', type: InputTypes.TEXT, readOnly: false, required: true },
    { name: 'admitted', type: InputTypes.TEXT, readOnly: false, required: false },
    { name: 'dateAdmitted', display: 'Date Admitted', type: InputTypes.DATETIME_LOCAL, readOnly: true, required: false },
    { name: 'dateDischarged', display: 'Date Discharged', type: InputTypes.DATETIME_LOCAL, readOnly: true, required: false },
    // { name: 'bill', type: InputTypes.TEXT, readOnly: true, required: false },
    { name: 'doctorId', display: 'Doctor ID', type: InputTypes.NUMBER, readOnly: false, required: false },
    { name: 'nurseId', display: 'Nurse ID', type: InputTypes.NUMBER, readOnly: false, required: false },
    { name: 'roomId', display: 'Room ID', type: InputTypes.NUMBER, readOnly: false, required: false },
    // { name: 'userName', type: InputTypes.TEXT, readOnly: false, required: true },
    // { name: 'password', type: InputTypes.PASSWORD, readOnly: false, required: true }
];

export default patientsTemplate
