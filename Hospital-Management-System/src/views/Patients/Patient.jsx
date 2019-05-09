import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import PatientsApi from '../../services/PatientsApi';
import utils from '../../utils'
import patientsTemplate from './PatientsTemplate';

class Patient extends Component {

    constructor() {
        super();

        this.state = { patient: {} };
        
        this.getPatientHandler = this.getPatientHandler.bind(this);
    }

    componentDidMount() {
        document.title = "Patient";        
        this.getPatientHandler(this.props.match.params.id);
    }
    
    getPatientHandler = (id) => PatientsApi.getPatient(id, patient => this.setState({patient: patient}));


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
                                            patientsTemplate.map(prop =>                                                
                                                <tr key={prop.name}>
                                                    <td>{`${prop.display || utils.capitalize(prop.name)}:`}</td>
                                                    <td><strong>{utils.stringify(this.state.patient[prop.name])}</strong></td>
                                                </tr>
                                            )
                                        }
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
