export default function doLogin(state = [], action) {
  const newState = _.cloneDeep(state);
  switch (action.type) {
    case 'LOGGED_IN':
      return Object.assign({}, newState, action.data);
    case 'LOGIN_FAILED':
      newState.error = true;
      newState.isLogged = action.data.isLogged;
      newState.message = action.data.message;
      newState.token = action.data.token;
      return newState;
    case 'LOGGED_OUT':
      return Object.assign({}, {}, { isLogged: false, token: null, message: '' });
    case 'LOGOUT_ERROR':
      return Object.assign({}, newState, { isLogged: true, error: true, message: action.error })
    default:
      return state;
  }
}
