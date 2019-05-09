import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Label, Input, Row } from 'reactstrap';

import patientsTemplate from './PatientsTemplate';
import PatientsApi from '../../services/PatientsApi';
import utils from '../../utils';
import DoctorsApi from '../../services/DoctorsApi';
import NursesApi from '../../services/NursesApi';

class EditPatient extends Component {

    constructor() {
        super();

        this.state = { patient: {}, doctors: [], nurses: [], rooms: [] };

        this.updateNursesHandler = this.updateNursesHandler.bind(this);
        this.updateDoctorsHandler = this.updateDoctorsHandler.bind(this);
        this.getPatientHandler = this.getPatientHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.patientsTemplate = utils.selectTemplateObjectsWithNames(patientsTemplate, ['name', 'mobile', 'address', 'gender', 'disease', 'doctorId', 'nurseId', 'roomId'])

        this.gender = null;
    }

    componentDidMount() {
        document.title = "Edit Patient";
        this.getPatientHandler(this.props.match.params.id);
        this.updateDoctorsHandler();
        this.updateNursesHandler();
    }

    updateNursesHandler = () => NursesApi.getNurses(nurses => this.setState({ nurses: nurses }));

    updateDoctorsHandler = () => DoctorsApi.getDoctors(doctors => this.setState({ doctors: doctors }));

    editPatientHandler = (patient, callback) => PatientsApi.editPatient(patient, callback);

    getPatientHandler = (id) => PatientsApi.getPatient(id, patient => { this.setState({ patient: patient }); document.getElementById(patient.gender == 'male' ? "gender-male" : "gender-female").checked = true; });

    handleSubmit = (event) => {
        event.preventDefault();

        var data = utils.parseForm(event.target, this.patientsTemplate);

        data.id = this.state.patient.id;
        data.doctorId = (data.doctorId == -1) ? null : parseInt(data.doctorId);
        data.nurseId = (data.nurseId == -1) ? null : parseInt(data.nurseId);
        data.roomId = (data.roomId == -1) ? null : parseInt(data.roomId);

        this.editPatientHandler(data, () => this.props.history.push('/patients'));
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="7">
                        <Card>
                            <CardHeader>
                                <strong>Edit Patient</strong>
                            </CardHeader>
                            <CardBody>
                                <form onSubmit={this.handleSubmit} className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="name">Name</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="name" name="name" placeholder="Name" required defaultValue={this.state.patient.name} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="mobile">Mobile</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="mobile" placeholder="Mobile" required defaultValue={this.state.patient.mobile} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="address">Address</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="address" id="address" placeholder="Address" required defaultValue={this.state.patient.address} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label>Gender</Label>
                                        </Col>
                                        <Col md="9">
                                            <FormGroup check inline>
                                                <Input className="form-check-input" type="radio" id="gender-male" name="gender" value="male" /*defaultChecked={this.state.patient.gender == 'male' ? 'checked' : 'false'}*/ /*checked={this.gender == "male" ? 'checked' : 'false'} onClick={this.gender = 'male'} */ />
                                                <Label className="form-check-label" check htmlFor="gender-male">Male</Label>
                                            </FormGroup>
                                            <FormGroup check inline>
                                                <Input className="form-check-input" type="radio" id="gender-female" name="gender" value="female" /*defaultChecked={this.state.patient.gender == 'female' ? 'checked' : 'false'}*/ /*checked={this.gender == "female" ? 'checked' : 'false'} onClick={this.gender = 'female'}*/ />
                                                <Label className="form-check-label" check htmlFor="gender-female">Female</Label>
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="disease">Disease</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="disease" placeholder="Disease" required defaultValue={this.state.patient.disease} />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="select">Doctor</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select" id="doctorId" defaultValue={this.state.patient.doctorId}>
                                                <option value="-1">Select Doctor</option>
                                                {
                                                    this.state.doctors.map(doctor =>
                                                        <option key={'doctor_' + doctor.id} value={doctor.id} selected={this.state.patient.doctorId == doctor.id ? 'selected' : false}>{doctor.name}</option>
                                                    )
                                                }
                                            </Input>
                                        </Col>
                                    </FormGroup>

                                    <br />
                                    <h4 style={{ textAlign: 'left', marginBottom: '-5px' }}>Hospital</h4>
                                    <hr />

                                    <FormGroup row>
                                        <Col md="3">

                                        </Col>
                                        <Col md="3">
                                            <Button color="success" disabled={this.state.patient.admitted} onClick={() => PatientsApi.admitPatient(this.state.patient.id, () => this.getPatientHandler(this.props.match.params.id))}>Admit</Button>
                                        </Col>
                                        <Col xs="12" md="4">
                                            <Button color="danger" disabled={!this.state.patient.admitted} onClick={() => PatientsApi.dischargePatient(this.state.patient.id, () => this.getPatientHandler(this.props.match.params.id))}>Discharge</Button>
                                        </Col>
                                    </FormGroup>



                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="select">Nurse</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select" id="nurseId" disabled={!this.state.patient.admitted}>
                                                <option value="-1">Select Nurse</option>
                                                {
                                                    this.state.nurses.map(nurse =>
                                                        <option key={'nurse_' + nurse.id} value={nurse.id} selected={this.state.patient.nurseId == nurse.id ? 'selected' : false}>{nurse.name}</option>
                                                    )
                                                }
                                            </Input>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="select">Room</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select" id="roomId" disabled={!this.state.patient.admitted} defaultValue={this.state.patient.roomId}>
                                                <option value="-1">Select Room</option>
                                                {
                                                    this.state.rooms.map(room =>
                                                        <option key={'room_' + room.id} value={room.id} selected={this.state.patient.roomId == room.id ? 'selected' : false}>{room.name}</option>
                                                    )
                                                }
                                            </Input>
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

export default EditPatient;
