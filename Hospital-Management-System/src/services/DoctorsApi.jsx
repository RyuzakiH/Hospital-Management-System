import Axios from 'axios';

class DoctorsApi {


    static getDoctors = (callback) => {
        Axios.get('api/doctors')
            .then(res => callback(res.data))
            .catch(DoctorsApi.errorHandler);
    }


    static getDoctor = (id, callback) => {
        Axios.get('api/doctors/' + id)
            .then(res => callback(res.data))
            .catch(DoctorsApi.errorHandler);
    }


    static addDoctor = (patient, callback) => {
        Axios.post('api/doctors', patient)
            .then(() => DoctorsApi.getDoctors(callback))
            .catch(DoctorsApi.errorHandler);
    }


    static editDoctor = (doctor, callback) => {
        let id = doctor.id;
        delete doctor.id;
        Axios.put('api/doctors/' + id, doctor)
            .then(() => DoctorsApi.getDoctors(callback))
            .catch(DoctorsApi.errorHandler);
    }


    static deleteDoctor = (id, callback) => {
        Axios.delete('api/doctors/' + id)
            .then(() => DoctorsApi.getDoctors(callback))
            .catch(DoctorsApi.errorHandler);
    }


    errorHandler = error => console.log(error);

}


export default DoctorsApi;
