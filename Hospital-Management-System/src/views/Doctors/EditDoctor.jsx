import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Label, Input, Row } from 'reactstrap';
import DoctorsApi from '../../services/DoctorsApi';

class EditDoctor extends Component {

    constructor() {
        super();

        this.state = { doctor: {} };

        this.getDoctorHandler = this.getDoctorHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        document.title = "Edit Doctor";
        this.getDoctorHandler(this.props.match.params.id);
    }

    editDoctorHandler = (doctor, callback) => DoctorsApi.editDoctor(doctor, callback);

    getDoctorHandler = (id) => DoctorsApi.getDoctor(id, doctor => this.setState({doctor: doctor}));

    handleSubmit = (event) => {
        event.preventDefault();

        var data = {
            id: this.state.doctor.id,
            name: event.target.elements['name'].value
        };
        
        console.log(data)

        this.editDoctorHandler(data, () => this.props.history.push('/doctors'));
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="7">
                        <Card>
                            <CardHeader>
                                <strong>Edit Doctor</strong>
                            </CardHeader>
                            <CardBody>
                                <form onSubmit={this.handleSubmit} className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="name">Name</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="name" placeholder="Name" required defaultValue={this.state.doctor.name} />
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

export default EditDoctor;
