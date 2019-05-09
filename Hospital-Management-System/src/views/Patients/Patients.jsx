import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import patientsTemplate from './PatientsTemplate';
import PatientsApi from '../../services/PatientsApi';
import utils from '../../utils';
import DeleteModal from './DeleteModal';

function PatientRow(props) {
    const patient = props.patient
    const patientLink = `/patients/${patient.id}`

    const getBadge = (status) => {
        return status === 'Active' ? 'success' :
            status === 'Inactive' ? 'secondary' :
                status === 'Pending' ? 'warning' :
                    status === 'Banned' ? 'danger' :
                        'primary'
    }

    return (
        <tr key={patient.id.toString()}>
            <th scope="row"><Link to={patientLink}>{patient.id}</Link></th>
            <td><Link to={patientLink}>{patient.name}</Link></td>
            <td>{patient.mobile}</td>
            <td>{patient.address}</td>
            {/* <td><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td> */}
            <td>{patient.gender}</td>

            <td>
                <Link to={"/patients/edit/" + patient.id} params={{ patient: patient }}>
                    <Button block color="info" size="sm">Edit</Button>
                </Link>
            </td>
            <td>
                <DeleteModal onDelete={() => props.deletePatientHandler(patient.id)} />
            </td>
        </tr>
    )
}

class Patients extends Component {

    constructor() {
        super();

        this.state = { patients: [] };

        this.patientsTemplate = utils.selectTemplateObjectsWithNames(patientsTemplate, ['id', 'name', 'mobile', 'address', 'gender'])
    }

    componentDidMount() {
        // var user = JSON.parse(utils.getCookie("user"));
        // if (user.role !== 'doctor' && user.role !== 'nurse' && user.role !== 'admin')
        //     this.props.history.push('/');

        document.title = "Patients";
        this.updatePatientsHandler();
    }

    updatePatientsHandler = () => PatientsApi.getPatients(patients => this.setState({ patients: patients }));


    addPatientHandler = (patient) => PatientsApi.addPatient(patient, this.updatePatientsHandler);

    editPatientHandler = (patient) => PatientsApi.editPatient(patient, this.updatePatientsHandler);

    deletePatientHandler = (patientId) => PatientsApi.deletePatient(patientId, this.updatePatientsHandler);


    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xl={8}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Patients <small className="text-muted">example</small>
                            </CardHeader>
                            <CardBody>
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Mobile</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Gender</th>
                                            <th scope="col">Edit</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.patients.map((patient, index) =>
                                            <PatientRow key={index} patient={patient} template={this.patientsTemplate} deletePatientHandler={this.deletePatientHandler} />
                                        )}
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

export default Patients;
