import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import UsersApi from '../../services/UsersApi';

class User extends Component {

    constructor() {
        super();
        this.state = { user: {} };
        this.getUserHandler = this.getUserHandler.bind(this);
    }

    componentDidMount() {
        document.title = "Users";
        this.getUserHandler(this.props.match.params.id);
    }

    getUserHandler = (id) => UsersApi.getUser(id, user => this.setState({ user: user }));



    render() {

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col lg={6}>
                        <Card>
                            <CardHeader>
                                <strong><i className="icon-info pr-1"></i>User id: {this.props.match.params.id}</strong>
                            </CardHeader>
                            <CardBody>
                                <Table responsive striped hover>
                                    <tbody>
                                        <tr>
                                            <td>{`ID:`}</td>
                                            <td><strong>{this.state.user.userId}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>{`Username:`}</td>
                                            <td><strong>{this.state.user.username}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>{`Password:`}</td>
                                            <td><strong>{this.state.user.password}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>{`Role:`}</td>
                                            <td><strong>{this.state.user.role}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>{`Private ID:`}</td>
                                            <td><strong>{this.state.user.privateId}</strong></td>
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

export default User;
