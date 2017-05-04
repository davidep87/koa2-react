import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { Button, Container, Divider, Form, Input, Segment } from 'semantic-ui-react';
import { getSettings, saveSettings } from '../../actions/actionCreators';

@connect((state, props) => ({
  auth: state.auth,
  settings: state.settings
}))

class SettingsForm extends React.Component {

  constructor(){
    super();
  }

  handleChange = (e, i) => {
    const newSettings = this.props.settings;
    newSettings[i] = e.target.value;
    this.setState({ newSettings });
  };

  saveSettings(e) {
    e.preventDefault();
    const token = this.props.auth.token;
    const settings = {
      sitename: this.sitename.inputRef.value,
      title: this.sitetitle.inputRef.value,
      description: this.sitedescription.inputRef.value,
      main_email: this.main_email.inputRef.value,
      facebook: this.facebook.inputRef.value,
      twitter: this.twitter.inputRef.value,
      linkedin: this.linkedin.inputRef.value,
    };

    this.props.dispatch(saveSettings({ token, settings }));
  }

  render() {

    const settings = this.props.settings;

    return (
      <Form onSubmit={this.saveSettings.bind(this)} size='small'>
        Impostazioni generali
        <Divider />
        <Form.Group widths='equal'>
          <Form.Field key='sitename'>
            <label>Nome sito</label>
            <Input
              ref={(input) => { this.sitename = input }}
              name='sitename'
              placeholder='Nome sito'
              value={settings.sitename ? settings.sitename : ''}
              onChange={(e) => this.handleChange(e, 'sitename')}
            />
          </Form.Field>
          <Form.Field>
            <label>Titolo sito</label>
            <Input
              ref={(input) => { this.sitetitle = input }}
              name='title'
              placeholder='Titolo home page'
              value={settings.title ? settings.title : ''}
              onChange={(e) => this.handleChange(e, 'title')}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label>Descrizione home page</label>
          <Input fluid type='text'
            ref={(input) => { this.sitedescription = input }}
            name='description'
            placeholder='Descrizione da mostrare sui motori di ricerca'
            value={settings.description ? settings.description : ''}
            onChange={(e) => this.handleChange(e, 'description')}
          />
        </Form.Field>
        <Row start="xs">
          <Col xs={6}>
            <Form.Field>
              <label>E-mail</label>
              <Input
                ref={(input) => { this.main_email = input }}
                name='main_email'
                type='email'
                name='title'
                placeholder='E-mail modulo di contatto'
                value={settings.main_email ? settings.main_email : ''}
                onChange={(e) => this.handleChange(e, 'main_email')}
              />
            </Form.Field>
          </Col>
        </Row>
        <h4> Link ai Social </h4>
        <Divider />
        <Form.Group widths='equal'>
          <Form.Field>
            <Input fluid type='text' placeholder='Link pagina facebook'
              action={{ color: 'facebook', labelPosition: 'left', icon: 'facebook', content: 'Facebook' }}
              actionPosition='left'
              name='facebook'
              ref={(input) => { this.facebook = input }}
              value={settings.facebook ? settings.facebook : ''}
              onChange={(e) => this.handleChange(e, 'facebook')}
            />
          </Form.Field>
          <Form.Field>
            <Input fluid type='text' placeholder='Link pagina twitter'
              action={{ color: 'twitter', labelPosition: 'left', icon: 'twitter', content: 'Twitter' }}
              actionPosition='left'
              name='twitter'
              ref={(input) => { this.twitter = input }}
              value={settings.twitter ? settings.twitter : ''}
              onChange={(e) => this.handleChange(e, 'twitter')}
            />
          </Form.Field>
          <Form.Field>
            <Input fluid type='text' placeholder='Link pagina linkedin'
              action={{ color: 'linkedin', labelPosition: 'left', icon: 'linkedin', content: 'Linkedin' }}
              actionPosition='left'
              name='linkedin'
              ref={(input) => { this.linkedin = input }}
              value={settings.linkedin ? settings.linkedin : ''}
              onChange={(e) => this.handleChange(e, 'linkedin')}
            />
          </Form.Field>
        </Form.Group>
        <Divider />
        <Button primary type='submit'>Salva</Button>
      </Form>
    )
  }
}

export default SettingsForm;
