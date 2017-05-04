import React from 'react';
import { connect } from 'react-redux';
import { Icon, Menu, Table, Button } from 'semantic-ui-react';

@connect((state, props) => ({
  auth: state.auth,
  users: state.users ? state.users : []
}))

class UsersTable extends React.Component {

  constructor(){
    super();
  }

  renderTable() {

    const users = this.props.users.list ? this.props.users.list : [];
    const token = this.props.auth.token;

    const userList = Object.values(users).map((user, i) => {
      let userId = user.id;
      return (
        <Table.Row className={ user.admin ? 'positive' : 'warning'} key={`userList-${i}`}>
          <Table.Cell>{user.id}</Table.Cell>
          <Table.Cell>{user.firstName}</Table.Cell>
          <Table.Cell>{user.lastName}</Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>{user.admin ? 'Admin' : 'User'}</Table.Cell>
          <Table.Cell>
            <Button.Group basic size='small'>
              <Button icon='search' />
              <Button onClick={() => { this.props.deleteUser(token, userId, i) }} icon='remove user' />
            </Button.Group>
          </Table.Cell>
        </Table.Row>
      )
    });

    const count = this.props.users.count ? this.props.users.count : 0;
    const pages = Math.ceil(count / 10);

    let pagination = [];

    for(let i=0; i<pages; i++){
      pagination.push(<Menu.Item onClick={() => { this.props.getUsers(i) }} key={i+1} as='a'>{i+1}</Menu.Item>);
    }

    return (
      <Table celled sortable={true}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell>Cognome</Table.HeaderCell>
            <Table.HeaderCell>E-Mail</Table.HeaderCell>
            <Table.HeaderCell>Tipo</Table.HeaderCell>
            <Table.HeaderCell>Azioni</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userList}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="6">
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='left chevron' />
                </Menu.Item>
                {pagination}
                <Menu.Item as='a' icon>
                  <Icon name='right chevron' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }

  render() {

    const userTable = this.renderTable();

    return (
      <div> { userTable } </div>
    )
  }
}

export default UsersTable;
