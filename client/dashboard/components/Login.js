import React from 'react';
import { doLogin } from '../actions/actionCreators';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import loginCSS from '../styles/login.css';
import { Button, Card, Form, Icon, Input, Message } from 'semantic-ui-react';
import { Link } from 'react-router';

@connect((state, props) => ({
  auth: state.auth
}))

class Login extends React.Component {

  constructor(props){
		super(props);
	}

  logIn(event) {
    event.preventDefault();
    const username = this.username.inputRef.value;
    const password = this.password.inputRef.value;
 		this.props.dispatch(doLogin({ username, password }));
  }

  render() {
    const message = this.props.auth.message;
    const messageStatus = message.length > 0 ? true : false;

    return (
      <div className="login animated fadeIn">
        <Row>
          <Col xs={12}>
            <Row center="xs">
              <Col xs={12} sm={6} md={4}>
                <Card fluid={true} raised={true} centered={true}>
                  <Card.Content>
                    <div className="loginForm">
                      <p> Welcome to the login page </p>
                      <Form onSubmit={this.logIn.bind(this)}>
                        <Form.Field>
                          <label>Username</label>
                          <Input ref={(input) => { this.username = input }} name="username" placeholder='Username' />
                        </Form.Field>
                        <Form.Field>
                          <label>Password</label>
                          <Input ref={(input) => { this.password = input }} name="password" type="password" placeholder='Password' />
                        </Form.Field>
                        <Form.Field>
                          <Message hidden={!messageStatus} visible={messageStatus} icon>
                            <Icon name='warning sign' />
                            <Message.Content>
                            <Message.Header>Ops qualcosa è andato storto</Message.Header>
                              { message }
                            </Message.Content>
                          </Message>
                        </Form.Field>
                        <Button type="submit" color='green'>
                          <Icon name='checkmark' /> Login
                        </Button>
                      </Form>
                    </div>
                  </Card.Content>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Login;
