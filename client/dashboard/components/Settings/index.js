import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { Container } from 'semantic-ui-react';
import SettingsForm from './form';
import { getSettings, saveSettings } from '../../actions/actionCreators';

@connect((state, props) => ({
  auth: state.auth,
  settings: state.settings
}))

class Settings extends React.Component {

  constructor(){
    super();
  }

  componentWillMount(){
    const token = this.props.auth.token;
    this.props.dispatch(getSettings({ token }));
  }

  render() {

    const settings = this.props.settings;

    return (
      <Row center="xs">
        <Col className="contentMaterialCard" xs={12}>
          <Container textAlign='left'>
            <SettingsForm settings={settings} />
          </Container>
        </Col>
      </Row>
    )
  }
}

export default Settings;
