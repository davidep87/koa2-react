export default function user(state = [], action) {

  const newState = _.cloneDeep(state);

  switch (action.type) {
    case 'USER_LIST_FETCHED':
      return Object.assign({}, {}, { count: action.data.count, list: action.data.rows });
    case 'USER_LIST_FETCH_FAILED':
      return Object.assign({}, newState, { error: action.error });
    case 'USER_ADDED':
      return Object.assign({}, newState, { count: newState.count, list : { ...newState.list, [newState.count] : action.data }});
    case 'USER_ADDED_FAIL':
      return Object.assign({}, newState, { error: action.error });
    case 'USER_DELETED':
      const list = _.omit(newState.list, action.i);
      return Object.assign({}, newState, { count: newState.count, list });
    case 'USER_DELETED_FAIL':
      return Object.assign({}, newState, { error: action.error });
    default:
      return newState;
  }
};
