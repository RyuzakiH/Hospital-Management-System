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

class EditNurse extends Component {
  constructor() {
    super();

    this.state = { nurse: {} };

    this.getNurseHandler = this.getNurseHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.title = "Edit Nurse";
    this.getNurseHandler(this.props.match.params.id);
  }

  editNurseHandler = (nurse, callback) => NursesApi.editNurse(nurse, callback);

  getNurseHandler = id =>
    NursesApi.getNurse(id, nurse => this.setState({ nurse: nurse }));

  handleSubmit = event => {
    event.preventDefault();

    var data = {
      id: this.state.nurse.id,
      name: event.target.elements["name"].value
    };

    console.log(data);

    this.editNurseHandler(data, () => this.props.history.push("/nurses"));
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="7">
            <Card>
              <CardHeader>
                <strong>Edit Nurse</strong>
              </CardHeader>
              <CardBody>
                <form onSubmit={this.handleSubmit} className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="name">Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="name"
                        placeholder="Name"
                        required
                        defaultValue={this.state.nurse.name}
                      />
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

export default EditNurse;
