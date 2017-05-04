import React from 'react';
import { Breadcrumb } from 'semantic-ui-react'
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';

@connect((state, props) => ({
  auth: state.auth
}))

class Breadcrumbs extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const page = this.props.path.split('/').filter((el) => el.length != 0);

    return (
      <Row>
        <Col xs={12}>
          <Breadcrumb size='large' divider='>' sections={page} />
        </Col>
      </Row>
    )
  }
}

export default Breadcrumbs;
