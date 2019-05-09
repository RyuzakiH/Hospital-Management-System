import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Label, Input, Row } from 'reactstrap';

import patientsTemplate from './PatientsTemplate';
import PatientsApi from '../../services/PatientsApi';
import utils from '../../utils';
import DoctorsApi from '../../services/DoctorsApi';

class AddPatient extends Component {

    constructor() {
        super();

        this.state = {
            doctors: []
        }

        this.updatePatientsHandler = this.updatePatientsHandler.bind(this);
        this.updateDoctorsHandler = this.updateDoctorsHandler.bind(this);
        this.addPatientHandler = this.addPatientHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.patientsTemplate = utils.selectTemplateObjectsWithNames(patientsTemplate, ['name', 'mobile', 'address', 'gender', 'disease', 'doctorId'/*, 'nurseId', 'roomId'*/])
    }

    componentDidMount() {
        document.title = "Add Patient";
        this.updatePatientsHandler();
        this.updateDoctorsHandler();
    }

    updateDoctorsHandler = () => DoctorsApi.getDoctors(doctors => this.setState({ doctors: doctors }));

    updatePatientsHandler = () => PatientsApi.getPatients(patients => this.setState({ patients: patients }));

    addPatientHandler = (patient) => PatientsApi.addPatient(patient, this.updatePatientsHandler);

    handleSubmit = (event) => {
        event.preventDefault();

        var data = utils.parseForm(event.target, this.patientsTemplate);
        
        data.doctorId = (data.doctorId == -1) ? null : parseInt(data.doctorId);
        // data.nurseId = (data.nurseId == -1) ? null : parseInt(data.nurseId);
        // data.roomId = (data.roomId == -1) ? null : parseInt(data.roomId);

        this.addPatientHandler(data);
        this.props.history.push('/patients');
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="7">
                        <Card>
                            <CardHeader>
                                <strong>Add Patient</strong>
                            </CardHeader>
                            <CardBody>
                                <form onSubmit={this.handleSubmit} className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="name">Name</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="name"  name="name" required placeholder="Name" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="DATA">Mobile</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="mobile" placeholder="Mobile" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="address">Address</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="address" id="address" placeholder="Address" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label>Gender</Label>
                                        </Col>
                                        <Col md="9">
                                            <FormGroup check inline>
                                                <Input className="form-check-input" type="radio" id="gender-male" name="gender" value="male" />
                                                <Label className="form-check-label" check htmlFor="gender-male">Male</Label>
                                            </FormGroup>
                                            <FormGroup check inline>
                                                <Input className="form-check-input" type="radio" id="gender-female" name="gender" value="female" />
                                                <Label className="form-check-label" check htmlFor="gender-female">Female</Label>
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="disease">Disease</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="disease" placeholder="Text" />
                                        </Col>
                                    </FormGroup>
                                    
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="select">Doctor</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select" id="doctorId">
                                                <option value="-1">Select Doctor</option>                                            
                                                {
                                                    this.state.doctors.map(doctor =>
                                                        <option key={'doctor_' + doctor.id} value={doctor.id}>{doctor.name}</option>
                                                    )
                                                }
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    
                                    {/* <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="select">Nurse</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select" id="nurseId">
                                                <option value="-1">Select Nurse</option>                                            
                                                {
                                                    this.state.nurses.map(nurse =>
                                                        <option key={'nurse_' + nurse.id} value={nurse.id}>{nurse.name}</option>
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
                                            <Input type="select" id="roomId">
                                                <option value="-1">Select Room</option>                                            
                                                {
                                                    this.state.rooms.map(room =>
                                                        <option key={'room_' + room.id} value={room.id}>{room.name}</option>
                                                    )
                                                }
                                            </Input>
                                        </Col>
                                    </FormGroup> */}

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

export default AddPatient;
