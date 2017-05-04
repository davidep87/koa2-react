import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { Provider } from 'react-redux';
import store, { history } from './store';

import Admin from './components/Admin';
import Login from './components/Login';
import Main from './components/Main';
import Dashboard from './components/Dashboard';
import Users from './components/Users/index';
import Settings from './components/Settings/index';
import Preloader from './components/Preloader';

export default class App extends React.Component {

  constructor(){
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount(){
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true })
    });
  }

  render() {
    if(!this.state.rehydrated)
      return (
        <div className="middle"> <Preloader /> </div>
      )

    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/dashboard" component={Main}>
            <IndexRoute component={Dashboard}></IndexRoute>
            <Route path="/dashboard/index" component={Dashboard} />
            <Route path="/dashboard/users" component={Users} />
            <Route path="/dashboard/settings" component={Settings} />
          </Route>
        </Router>
      </Provider>
    )
  }
}

render(<App />, document.querySelector('#root'));
