import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Label,
  Input,
  Row
} from "reactstrap";
import NursesApi from "../../services/NursesApi";

class addNurse extends Component {
  constructor() {
    super();

    this.addNurseHandler = this.addNurseHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.title = "Add Nurse";
  }

  addNurseHandler = (nurse, callback) => NursesApi.addNurse(nurse, callback);

  handleSubmit = event => {
    event.preventDefault();

    var data = {
      id: event.target.elements["id"].value,
      name: event.target.elements["name"].value,
      address: event.target.elements["address"].value,
      mobile: event.target.elements["mobile"].value,
      gender: event.target.elements["gender"].value
    };

    this.addNurseHandler(data, () => this.props.history.push("/nurses"));
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="7">
            <Card>
              <CardHeader>
                <strong>Add Nurse</strong>
              </CardHeader>
              <CardBody>
                <form onSubmit={this.handleSubmit} className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="id">ID</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="id"
                        name="id"
                        required
                        placeholder="id"
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="name">Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Name"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="DATA">Mobile</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="mobile"
                        name="mobile"
                        required
                        placeholder="mobile"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="address">Address</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="address"
                        id="address"
                        name="address"
                        required
                        placeholder="address"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Gender</Label>
                    </Col>
                    <Col md="9">
                      <FormGroup check inline>
                        <Input
                          className="form-check-input"
                          type="radio"
                          id="gender-male"
                          name="gender"
                          value="male"
                        />
                        <Label
                          className="form-check-label"
                          check
                          htmlFor="gender-male"
                        >
                          Male
                        </Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input
                          className="form-check-input"
                          type="radio"
                          id="gender-female"
                          name="gender"
                          value="female"
                        />
                        <Label
                          className="form-check-label"
                          check
                          htmlFor="gender-female"
                        >
                          Female
                        </Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default addNurse;
