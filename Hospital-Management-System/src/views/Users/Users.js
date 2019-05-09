import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import UsersApi from '../../services/UsersApi';

function UserRow(props) {
    const user = props.user
    const userLink = `/users/${user.userId}`

    const getBadge = (status) => {
        return status === 'Active' ? 'success' :
            status === 'Inactive' ? 'secondary' :
                status === 'Pending' ? 'warning' :
                    status === 'Banned' ? 'danger' :
                        'primary'
    }

    return (
        <tr key={user.userId.toString()}>
            <th scope="row"><Link to={userLink}>{user.userId}</Link></th>
            <td><Link to={userLink}>{user.username}</Link></td>
            <td>{user.password}</td>
            <td>{user.role}</td>
            <td>{user.privateId}</td>
            {/*<td><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td>*/}
        </tr>
    )
}

class Users extends Component {


    constructor() {
        super();
        this.state = { users: [] };
    }

    componentDidMount() {
        document.title = "Users";
        this.updateUsersHandler();
    }

    updateUsersHandler = () => UsersApi.getUsers(users => this.setState({ users: users }));


    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
                            </CardHeader>
                            <CardBody>
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Username</th>
                                            <th scope="col">Password</th>
                                            <th scope="col">Role</th>
                                            <th scope="col">PrivateID</th>
                                            {/*<th scope="col">status</th>*/}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.users.map((user, index) =>
                                                <UserRow key={index} user={user} />
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

export default Users;
