import React from 'react'
import { connect } from 'react-redux';
import { Dropdown, Image } from 'semantic-ui-react'
import { Link } from 'react-router';
import { logout } from '../actions/actionCreators';

@connect((state, props) => ({
  auth: state.auth
}))

export default class TopBarDropdown extends React.Component {

  logout() {
    const token = this.props.auth.token;
    this.props.dispatch(logout({ token }));
  }

  render() {

    const trigger = (
      <span>
        <Image avatar src='/images/default-user.png' />
      </span>
    )

    return (
      <Dropdown trigger={trigger} icon={null}>
        <Dropdown.Menu>
          <Link to="/dashboard/settings">
            <Dropdown.Item text='Impostazioni' />
          </Link>
          <Dropdown.Item onClick={this.logout.bind(this)} text='Log-out' />
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
