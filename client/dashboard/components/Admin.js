import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';

function mapStateToProps(state){
  return {
    auth: state.login,
    users: state.users,
    settings: state.settings
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(actionCreators, dispatch);
}

const Admin = connect(mapStateToProps, mapDispatchToProps)(Main);

export default Admin;
