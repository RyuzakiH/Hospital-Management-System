import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Axios from 'axios';
import utils from '../../../utils'

class Register extends Component {

    componentDidMount() {
        if (utils.getCookie("user") != null)
            this.props.history.push('/')
    }    

    registerSuccessHandler = (user) => {
        utils.setCookie('user', JSON.stringify({ userId: user.userId, role: user.role }));
        this.props.history.push('/');
    }

    handleRegister = (e) => {
        e.preventDefault();

        var data = {
            username: e.target.elements['username'].value,
            password: e.target.elements['password'].value,
            role: e.target.elements['role'].value,
            privateId: parseInt(e.target.elements['privateId'].value)
        }

        Axios.post('api/register', data)
            .then(res => this.loginSuccessHandler(res.data))
            .catch(error => console.log(error));
    }




    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <Form onSubmit={this.handleRegister}>
                                        <h1>Register</h1>
                                        <p className="text-muted">Create your account</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" placeholder="Username" autoComplete="username" id="username" />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" placeholder="Password" autoComplete="new-password" id="password" />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="select" id="role">
                                                <option value="-1">Select Role</option>
                                                <option value="patient">Patient</option>
                                                <option value="doctor">Doctor</option>
                                                <option value="nurse">Nurse</option>
                                            </Input>
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="number" placeholder="Private ID" id="privateId" />
                                        </InputGroup>
                                        <Button color="success" block>Create Account</Button>
                                    </Form>
                                </CardBody>
                                <CardFooter className="p-4">
                                    <Row>
                                        <Col xs="12" sm="6">
                                            <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                                        </Col>
                                    </Row>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Register;
