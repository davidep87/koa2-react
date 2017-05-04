import React from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { Row, Col } from 'react-flexbox-grid';
import { Container } from 'semantic-ui-react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import { Link } from 'react-router';
import store from '../store';
import Dashboard from './Dashboard';
import Login from './Login';
import TopBarDropdown from './TopBarDropdown';
import Breadcrumbs from './Breadcrumb';
import layoutCSS from '../styles/layout.css';
import { logout } from '../actions/actionCreators';

const meta = {
      title: 'MDSLab CMS',
      description: 'MDSLab Koa React'
    };


@connect((state, props) => ({
  auth: state.auth,
  rehydrated: state.rehydrated
}))

class Main extends React.Component {

  constructor(){
    super();
    this.state = { open: false };
  }

  handleToggle = () => this.setState({open: !this.state.open});

  renderLogin() {

    return (
      <div>
        <DocumentMeta {...meta} />
        <Login />
      </div>
    )
  }

  render() {

    if(!store.getState().auth.isLogged){
      return (
        <div>{this.renderLogin()}</div>
        )
    }

    return (
      <div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='push' width='thin' visible={this.state.open} icon='labeled' vertical inverted>
            <Link onClick={this.handleToggle} to="/dashboard/index">
              <Menu.Item name='home'>
                <Icon name='home' />
                Dashboard
              </Menu.Item>
            </Link>
            <Link onClick={this.handleToggle} to="/dashboard/pages">
              <Menu.Item name='wordpress forms'>
                <Icon name='wordpress forms' />
                Pagine
              </Menu.Item>
            </Link>
            <Link onClick={this.handleToggle} to="/dashboard/news">
              <Menu.Item name='newspaper'>
                <Icon name='newspaper' />
                Notizie
              </Menu.Item>
            </Link>
            <Link onClick={this.handleToggle} to="/dashboard/users">
              <Menu.Item name='users'>
                <Icon name='users' />
                Utenti
              </Menu.Item>
            </Link>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Menu className='appBarmenu' size='tiny'>
                <Header as='h4' >
                  <Icon name="content" onClick={this.handleToggle} /> MDSLab CMS</Header>
                <Menu.Menu position='right'>
                  <TopBarDropdown/>
                </Menu.Menu>
              </Menu>
              <Container>
                <Breadcrumbs path={this.props.location.pathname} />
                {this.props.children}
              </Container>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )

  }
}

export default Main;
