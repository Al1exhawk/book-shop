import store from './store'
import React from 'react';
import LoginForm from './containers/loginFormContainer'
import { Provider } from 'react-redux'
import { HashRouter as Router, Switch, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Provider store={store}>
        <div className="App">
          <Router >     
            <Switch>
              <Route path='/' component = { LoginForm }/>
              <Route path='/login' component = { LoginForm }/>
            </Switch>
          </Router>   
        </div>
    </Provider>
  );
}

export default App;
