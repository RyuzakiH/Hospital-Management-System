import Axios from 'axios';

class UsersApi {


    static getUsers = (callback) => {
        Axios.get('api/users')
            .then(res => callback(res.data))
            .catch(UsersApi.errorHandler);
    }


    static getUser = (id, callback) => {
        Axios.get('api/users/' + id)
            .then(res => callback(res.data))
            .catch(UsersApi.errorHandler);
    }


    static addUser = (patient, callback) => {
        Axios.post('api/users', patient)
            .then(() => UsersApi.getUsers(callback))
            .catch(UsersApi.errorHandler);
    }


    static editUser = (user, callback) => {
        let id = user.id;
        delete user.id;
        Axios.put('api/users/' + id, user)
            .then(() => UsersApi.getUsers(callback))
            .catch(UsersApi.errorHandler);
    }


    static deleteUser = (id, callback) => {
        Axios.delete('api/users/' + id)
            .then(() => UsersApi.getUsers(callback))
            .catch(UsersApi.errorHandler);
    }


    errorHandler = error => console.log(error);

}


export default UsersApi;
