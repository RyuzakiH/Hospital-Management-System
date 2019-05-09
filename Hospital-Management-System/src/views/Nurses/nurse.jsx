import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import NursesApi from "../../services/NursesApi";

class nurse extends Component {
  constructor() {
    super();

    this.state = { nurse: {} };

    this.getNurseHandler = this.getNurseHandler.bind(this);
  }

  componentDidMount() {
    document.title = "Nurse";
    this.getNurseHandler(this.props.match.params.id);
  }

  getNurseHandler = id =>
    NursesApi.getNurse(id, nurse => this.setState({ nurse: nurse }));

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="icon-info pr-1" />
                  Nurse id: {this.props.match.params.id}
                </strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    <tr>
                      <td>{`ID:`}</td>
                      <td>
                        <strong>{this.state.nurse.id}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>{`Name:`}</td>
                      <td>
                        <strong>{this.state.nurse.name}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>{`Address:`}</td>
                      <td>
                        <strong>{this.state.nurse.address}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>{`Mobile:`}</td>
                      <td>
                        <strong>{this.state.nurse.mobile}</strong>
                      </td>
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
    );
  }
}

export default nurse;
