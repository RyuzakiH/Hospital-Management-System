import Axios from 'axios';

class RoomsApi {


    static getRooms = (callback) => {
        Axios.get('api/rooms')
            .then(res => callback(res.data))
            .catch(RoomsApi.errorHandler);
    }


    static getRoom = (id, callback) => {
        Axios.get('api/rooms/' + id)
            .then(res => callback(res.data))
            .catch(RoomsApi.errorHandler);
    }


    static addRoom = (room, callback) => {
        Axios.post('api/rooms', room)
            .then(() => RoomsApi.getRooms(callback))
            .catch(RoomsApi.errorHandler);
    }


    static editRoom = (room, callback) => {
        let id = room.id;
        delete room.id;
        Axios.put('api/rooms/' + id, room)
            .then(() => RoomsApi.getRooms(callback))
            .catch(RoomsApi.errorHandler);
    }


    static deleteRoom = (id, callback) => {
        Axios.delete('api/rooms/' + id)
            .then(() => RoomsApi.getRooms(callback))
            .catch(RoomsApi.errorHandler);
    }


    errorHandler = error => console.log(error);

}


export default RoomsApi;
