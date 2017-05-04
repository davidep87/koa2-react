import React from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

export default class Preloader extends React.Component {

  render() {
    return (
      <Segment>
        <Dimmer active inverted>
          <Loader size='large' inverted>Loading</Loader>
        </Dimmer>
      </Segment>
    );
  }
}
