import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from "reactstrap";

import DeleteModal from "./DeleteModal";
import NursesApi from "../../services/NursesApi";

function NurseRow(props) {
  const nurse = props.nurse;
  const nurseLink = `/nurses/${nurse.id}`;

  const getBadge = status => {
    return status === "Active"
      ? "success"
      : status === "Inactive"
      ? "secondary"
      : status === "Pending"
      ? "warning"
      : status === "Banned"
      ? "danger"
      : "primary";
  };

  return (
    <tr key={nurse.id.toString()}>
      <th scope="row">
        <Link to={nurseLink}>{nurse.id}</Link>
      </th>
      <td>
        <Link to={nurseLink}>{nurse.name}</Link>
      </td>
      <td>
        <Link to={nurseLink}>{nurse.address}</Link>
      </td>
      <td>
        <Link to={nurseLink}>{nurse.mobile}</Link>
      </td>
      <td>
        <Link to={nurseLink}>{nurse.gender}</Link>
      </td>

      <td>
        <Link to={"/nurses/edit/" + nurse.id} params={{ nurse: nurse }}>
          <Button block color="info" size="sm">
            Edit
          </Button>
        </Link>
      </td>
      <td>
        <DeleteModal onDelete={() => props.deleteNurseHandler(nurse.id)} />
      </td>
    </tr>
  );
}

class Nurses extends Component {
  constructor() {
    super();

    this.state = { nurses: [] };
  }

  componentDidMount() {
    document.title = "Nurses";
    this.updateNursesHandler();
  }

  updateNursesHandler = () =>
    NursesApi.getNurses(nurses => this.setState({ nurses: nurses }));

  addNurseHandler = nurse =>
    NursesApi.addNurse(nurse, this.updateNursesHandler);

  editNurseHandler = nurse =>
    NursesApi.editNurse(nurse, this.updateNursesHandler);

  deleteNurseHandler = id =>
    NursesApi.deleteNurse(id, this.updateNursesHandler);

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={8}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Nurses
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Address</th>
                      <th scope="col">Mobile</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.nurses.map((nurse, index) => (
                      <NurseRow
                        key={index}
                        nurse={nurse}
                        deleteNurseHandler={this.deleteNurseHandler}
                      />
                    ))}
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

export default Nurses;
