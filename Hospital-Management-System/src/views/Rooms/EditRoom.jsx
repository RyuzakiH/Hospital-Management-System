import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Label,
  Input,
  Row
} from 'reactstrap';
import RoomsApi from '../../services/RoomsApi';

class EditRoom extends Component {

    constructor() {
        super();

        this.state = { room: {} };

        this.getRoomHandler = this.getRoomHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        document.title = "Edit Room";
        this.getRoomHandler(this.props.match.params.id);
    }

    editRoomHandler = (room, callback) => RoomsApi.editRoom(room, callback);

    getRoomHandler = (id) =>
    RoomsApi.getRoom(id, room => this.setState({room: room}));

    handleSubmit = (event) => {
        event.preventDefault();

        var data = {
            id: this.state.room.id,
            number: event.target.elements['number'].value
        };

        console.log(data)

        this.editRoomHandler(data, () => this.props.history.push('/rooms'));
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="7">
                        <Card>
                            <CardHeader>
                                <strong>Edit Room</strong>
                            </CardHeader>
                            <CardBody>
                                <form onSubmit={this.handleSubmit} className="form-horizontal">
                                    {/*<FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="name">Room No.</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="id" placeholder="id" required defaultValue={this.state.room.id} />
                                        </Col>
                                    </FormGroup>*/}
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="name">Number</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="number" placeholder="Number" required defaultValue={this.state.room.number} />
                                        </Col>
                                    </FormGroup>
                                    <Button type="submit" color="primary">Submit</Button>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default EditRoom;
