import React from 'react';
import { connect } from 'react-redux';

@connect((state, props) => ({
  auth: state.auth
}))

class Dashboard extends React.Component {

  render() {
    return (
      <div>
        <p> Welcome in dashboard </p>
      </div>
    )
  }
}

export default Dashboard;
