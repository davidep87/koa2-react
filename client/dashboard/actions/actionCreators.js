import axios from 'axios';

export function doLogin({ username, password }) {
  return async dispatch => {
    try {
      const response = await axios.post('/api/login', { username, password } );
      const data = response.data;
      if(data.isLogged){
        dispatch({ type: 'LOGGED_IN', data });
      } else {
        dispatch({ type: 'LOGIN_FAILED', data });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILED', error });
    }
  };
}

export function logout({token}){
  return async dispatch => {
    try {
      const response = await axios.post('/api/logout', { token } );
      if(response.data){
        const data = response.data;
        dispatch({ type: 'LOGGED_OUT', data });
      }
    } catch (error) {
      dispatch({ type: 'LOGOUT_ERROR', error });
    }

  }
}
