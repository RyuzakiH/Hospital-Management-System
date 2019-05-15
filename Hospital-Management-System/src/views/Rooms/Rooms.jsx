import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import DeleteModal from './DeleteModal';
import RoomsApi from '../../services/RoomsApi';

function RoomRow(props) {
    const room = props.room
    const roomLink = `/rooms/${room.id}`

    const getBadge = (status) => {
        return status === 'Active'
        ? 'success' :
        status === 'Inactive'
        ? 'secondary' :
        status === 'Pending'
        ? 'warning' :
        status === 'Banned'
        ? 'danger'
        : 'primary';
    }

    return (
        <tr key={room.id.toString()}>
            <th scope="row">
            <Link to={roomLink}>{room.id}</Link>
            </th>
            <td>
            <Link to={roomLink}>{room.number}</Link>
            </td>

            <td>
                <Link to={"/rooms/edit/" + room.id} params={{ room: room }}>
                    <Button block color="info" size="sm">Edit</Button>
                </Link>
            </td>
            <td>
                <DeleteModal onDelete={() => props.deleteRoomHandler(room.id)} />
            </td>
        </tr>
    )
}

class Rooms extends Component {

    constructor() {
        super();

        this.state = { rooms: [] };
    }

    componentDidMount() {
        document.title = "Rooms";
        this.updateRoomsHandler();
    }

    updateRoomsHandler = () => RoomsApi.getRooms(rooms => this.setState({ rooms: rooms }));

    addRoomHandler = (room) => RoomsApi.addRoom(room, this.updateRoomsHandler);

    editRoomHandler = (room) => RoomsApi.editRoom(room, this.updateRoomsHandler);

    deleteRoomHandler = (id) => RoomsApi.deleteRoom(id, this.updateRoomsHandler);


    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xl={8}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Rooms
                            </CardHeader>
                            <CardBody>
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th scope="col">Room No.</th>
                                            <th scope="col">Number</th>
                                            <th scope="col">Edit</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.rooms.map((room, index) => (
                                            <RoomRow
                                             key={index}
                                             room={room}
                                             deleteRoomHandler={this.deleteRoomHandler} />
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Rooms;
