import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import PatientsApi from '../../services/PatientsApi';
import DoctorsApi from '../../services/DoctorsApi';
import NursesApi from '../../services/NursesApi';
import RoomsApi from '../../services/RoomsApi';
import utils from '../../utils'
import patientsTemplate from './PatientsTemplate';
import { Link } from 'react-router-dom';

class Patient extends Component {

    constructor() {
        super();

        this.state = {
            patient: {},
            doctor: {},
            nurse: {},
            room: {}
        };

        this.getPatientHandler = this.getPatientHandler.bind(this);
        this.getDoctorHandler = this.getDoctorHandler.bind(this);
        this.getNurseHandler = this.getNurseHandler.bind(this);
        this.getRoomHandler = this.getRoomHandler.bind(this);

        this.patientsTemplate = Object.assign([], patientsTemplate);
        delete this.patientsTemplate[9];
        delete this.patientsTemplate[10];
        delete this.patientsTemplate[11];
    }

    componentDidMount() {
        document.title = "Patient";
        this.getPatientHandler(this.props.match.params.id, patient => {
            this.getDoctorHandler(patient.doctorId);
            this.getNurseHandler(patient.nurseId);
            this.getRoomHandler(patient.roomId);
        });
    }

    getPatientHandler = (id, callback) => PatientsApi.getPatient(id, patient => { this.setState({ patient: patient }); callback(patient); });

    getDoctorHandler = id => DoctorsApi.getDoctor(id, doctor => this.setState({ doctor: doctor }));

    getNurseHandler = id => NursesApi.getNurse(id, nurse => this.setState({ nurse: nurse }));

    getRoomHandler = id => RoomsApi.getRoom(id, room => this.setState({ room: room }));


    render() {

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col lg={6}>
                        <Card>
                            <CardHeader>
                                <strong><i className="icon-info pr-1"></i>Patient id: {this.props.match.params.id}</strong>
                            </CardHeader>
                            <CardBody>
                                <Table responsive striped hover>
                                    <tbody>
                                        {
                                            this.patientsTemplate.map(prop =>
                                                <tr key={prop.name}>
                                                    <td>{`${prop.display || utils.capitalize(prop.name)}:`}</td>
                                                    <td><strong>{utils.stringify(this.state.patient[prop.name])}</strong></td>
                                                </tr>
                                            )
                                        }
                                        <tr>
                                            <td>{`Doctor:`}</td>
                                            <td><strong><Link to={`/doctors/${this.state.patient.doctorId}`}>{this.state.doctor.name}</Link></strong></td>
                                        </tr>
                                        <tr>
                                            <td>{`Nurse:`}</td>
                                            <td><strong><Link to={`/nurses/${this.state.patient.nurseId}`}>{this.state.nurse.name}</Link></strong></td>
                                        </tr>
                                        <tr>
                                            <td>{`Room:`}</td>
                                            <td><strong><Link to={`/rooms/${this.state.patient.roomId}`}>{this.state.room.id}</Link></strong></td>
                                        </tr>
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

export default Patient;
