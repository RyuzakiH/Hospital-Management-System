import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import DoctorsApi from '../../services/DoctorsApi';

class Doctor extends Component {

    constructor() {
        super();

        this.state = { doctor: {} };
        
        this.getDoctorHandler = this.getDoctorHandler.bind(this);
    }

    componentDidMount() {
        document.title = "Doctor";        
        this.getDoctorHandler(this.props.match.params.id);
    }
    
    getDoctorHandler = (id) => DoctorsApi.getDoctor(id, doctor => this.setState({doctor: doctor}));


    render() {

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col lg={6}>
                        <Card>
                            <CardHeader>
                                <strong><i className="icon-info pr-1"></i>Doctor id: {this.props.match.params.id}</strong>
                            </CardHeader>
                            <CardBody>
                                <Table responsive striped hover>
                                    <tbody>
                                        
                                        <tr>
                                            <td>{`ID:`}</td>
                                            <td><strong>{this.state.doctor.id}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>{`Name:`}</td>
                                            <td><strong>{this.state.doctor.name}</strong></td>
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

export default Doctor;
