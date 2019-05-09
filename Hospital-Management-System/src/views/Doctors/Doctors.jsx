import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import DeleteModal from './DeleteModal';
import DoctorsApi from '../../services/DoctorsApi';

function DoctorRow(props) {
    const doctor = props.doctor
    const doctorLink = `/doctors/${doctor.id}`

    const getBadge = (status) => {
        return status === 'Active' ? 'success' :
            status === 'Inactive' ? 'secondary' :
                status === 'Pending' ? 'warning' :
                    status === 'Banned' ? 'danger' :
                        'primary'
    }

    return (
        <tr key={doctor.id.toString()}>
            <th scope="row"><Link to={doctorLink}>{doctor.id}</Link></th>
            <td><Link to={doctorLink}>{doctor.name}</Link></td>
            
            <td>
                <Link to={"/doctors/edit/" + doctor.id} params={{ doctor: doctor }}>
                    <Button block color="info" size="sm">Edit</Button>
                </Link>
            </td>
            <td>
                <DeleteModal onDelete={() => props.deleteDoctorHandler(doctor.id)} />
            </td>
        </tr>
    )
}

class Doctors extends Component {

    constructor() {
        super();

        this.state = { doctors: [] };
    }

    componentDidMount() {
        document.title = "Doctors";
        this.updateDoctorsHandler();
    }

    updateDoctorsHandler = () => DoctorsApi.getDoctors(doctors => this.setState({ doctors: doctors }));

    addDoctorHandler = (doctor) => DoctorsApi.addDoctor(doctor, this.updateDoctorsHandler);

    editDoctorHandler = (doctor) => DoctorsApi.editDoctor(doctor, this.updateDoctorsHandler);

    deleteDoctorHandler = (id) => DoctorsApi.deleteDoctor(id, this.updateDoctorsHandler);


    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xl={8}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Doctors
                            </CardHeader>
                            <CardBody>
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Edit</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.doctors.map((doctor, index) =>
                                            <DoctorRow key={index} doctor={doctor} deleteDoctorHandler={this.deleteDoctorHandler} />
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

export default Doctors;
