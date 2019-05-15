import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import RoomsApi from '../../services/RoomsApi';

class Room extends Component {

    constructor() {
        super();

        this.state = { room: {} };

        this.getRoomHandler = this.getRoomHandler.bind(this);
    }

    componentDidMount() {
        document.title = "Room";
        this.getRoomHandler(this.props.match.params.id);
    }

    getRoomHandler = (id) =>
        RoomsApi.getRoom(id, room => this.setState({room: room}));


    render() {

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col lg={6}>
                        <Card>
                            <CardHeader>
                                <strong><i className="icon-info pr-1"></i>Room id: {this.props.match.params.id}</strong>
                            </CardHeader>
                            <CardBody>
                                <Table responsive striped hover>
                                    <tbody>

                                        <tr>
                                            <td>{`Id:`}</td>
                                            <td><strong>{this.state.room.id}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>{`Number:`}</td>
                                            <td><strong>{this.state.room.number}</strong></td>
                                        </tr>
                                        {/* {
                                            patientsTemplate.map(prop =>
                                                <tr key={prop.name}>
                                                    <td>{`${prop.display || utils.capitalize(prop.name)}:`}</td>
                                                    <td><strong>{utils.stringify(this.state.patient[prop.name])}</strong></td>
                                                </tr>
                                            )
                                        } */}
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

export default Room;
