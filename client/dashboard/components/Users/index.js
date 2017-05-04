import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { getUsers, deleteUser } from '../../actions/actionCreators';
import { Icon, Button } from 'semantic-ui-react';
import UsersForm from './form';
import UsersTable from './table';

@connect((state, props) => ({
  auth: state.auth,
  users: state.users ? state.users : []
}))

class Users extends React.Component {

  constructor(props){
    super(props);
  }

  state = { open: false }
  show = (dimmer) => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  async componentWillMount(){
    const token = this.props.auth.token;
    const status = this.props.users;
    const i = 0;
    await this.props.dispatch(getUsers({ token, i }));
  }

  getUsers(i){
    const token = this.props.auth.token;
    this.props.dispatch(getUsers({ token, i }));
  }

  deleteUser(token, userId, i) {
    this.props.dispatch(deleteUser({ token, userId, i }));
  }

  render() {

    const users = this.props.users.list;

    return (
      <Row>
        <Col className="tableMaterialCard" xs={12} md={12}>
          <Col className="pad10" xs={12}>
            <Row end="xs">
              <Button onClick={this.show(true)} className="MDSLabcolor" basic>
                <Icon name='plus' />
                Nuovo utente</Button>
            </Row>
          </Col>
          <UsersTable
            props={this.props}
            deleteUser={this.deleteUser}
            getUsers={this.getUsers}
          />
        </Col>
        <UsersForm
          users={users}
          open={this.state.open}
          dimmer={this.state.dimmer}
          closeModal={this.close}
        />
      </Row>
    )
  }
}

export default Users;
