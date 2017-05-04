import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import users from './users';
import settings from './settings';


const rootReducer = combineReducers({
  auth, users, settings,
  routing: routerReducer
});

export default rootReducer;
