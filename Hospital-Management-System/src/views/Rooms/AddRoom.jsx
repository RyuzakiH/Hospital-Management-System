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

class AddRoom extends Component {

    constructor() {
        super();

        this.addRoomHandler = this.addRoomHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        document.title = "Add Room";
    }

    addRoomHandler = (room, callback) => RoomsApi.addRoom(room, callback);

    handleSubmit = (event) => {
        event.preventDefault();

        var data = {
            //id: event.target.elements["id"].value,
            number: event.target.elements["number"].value
        };

        this.addRoomHandler(data, () => this.props.history.push('/rooms'));
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="7">
                        <Card>
                            <CardHeader>
                                <strong>Add Room</strong>
                            </CardHeader>
                            <CardBody>
                                <form onSubmit={this.handleSubmit} className="form-horizontal">
                                    {/*<FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="name">Room Number</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="id"  name="id" required placeholder="room number" />
                                        </Col>
                                    </FormGroup>*/}
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="number">Number</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="number" name="number" required placeholder="number" />
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

export default AddRoom;
