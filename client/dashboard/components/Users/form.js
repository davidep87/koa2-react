import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Radio, Icon, Modal, Header } from 'semantic-ui-react';
import { addUser } from '../../actions/actionCreators';

@connect((state, props) => ({
  auth: state.auth,
  users: state.users ? state.users : []
}))

class UsersForm extends React.Component {

  constructor(){
    super();
  }

  radioIsActive (){
    this.admin = this.admin ? 0 : 1;
  }

  addNewUser(e) {
    e.preventDefault();

    const token = this.props.auth.token;
    console.log(this);
    const newUser = {
      firstName: this.firstName.inputRef.value,
      lastName: this.lastName.inputRef.value,
      username: this.username.inputRef.value,
      email: this.email.inputRef.value,
      password: this.password.inputRef.value,
      admin: this.admin
    };

 	  this.props.dispatch(addUser({ token, newUser}));
    this.props.closeModal();
  }


  render() {
    const { open, dimmer, closeModal } = this.props;

    return (
      <Modal dimmer={dimmer} open={open} onClose={closeModal} closeIcon='close'>
        <Header icon='user' content='Inserisci un nuovo utente' />
        <Modal.Content>
          <Form onSubmit={this.addNewUser.bind(this)}>
            <Form.Field>
              <Radio ref={(input) => { this.admin = input }} label='Assegna a questo utente i ruoli di amministratore'
                onClick={() => {this.radioIsActive()} } name="admin" toggle />
            </Form.Field>
            <Form.Field>
              <label>Nome</label>
              <Input ref={(input) => { this.firstName = input }} name="firstName" autoComplete="new-firstName" type="text" placeholder='Nome' />
            </Form.Field>
            <Form.Field>
              <label>Cognome</label>
              <Input ref={(input) => { this.lastName = input }} name="lastName" autoComplete="new-lastName" type="text" placeholder='Cognome' />
            </Form.Field>
            <Form.Field>
              <label>Username</label>
              <Input ref={(input) => { this.username = input }} name="username" autoComplete="new-username" type="text" placeholder='Username' />
            </Form.Field>
            <Form.Field>
              <label>E-mail</label>
              <Input ref={(input) => { this.email = input }} name="email" autoComplete="new-email" type="email" placeholder='E-mail' />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input ref={(input) => { this.password = input }} name="password" autoComplete="new-password" type="password" placeholder='Password' />
            </Form.Field>
            <Button onClick={() => { closeModal() }} color='red'>
              <Icon name='delete' /> Annulla
            </Button>
            <Button type="submit" color='green'>
              <Icon name='checkmark' /> Salva
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default UsersForm;
