export default function settings(state = [], action) {

  const newState = _.cloneDeep(state);
  
  switch (action.type) {
    case 'GET_SETTINGS':
      return Object.assign({}, {}, action.data);
    case 'GET_SETTINGS_FAIL':
      return Object.assign({}, newState, { error: action.error });
    case 'SETTINGS_UPDATED':
      return Object.assign({}, {}, action.data);
    case 'SETTINGS_UPDATE_FAIL':
      return Object.assign({}, newState, { error: action.error });
    default:
      return newState;
  }
};
