import store from './store'
import React from 'react';
import LoginForm from './containers/loginFormContainer'
import { Provider } from 'react-redux'

const App: React.FC = () => {
  return (
    <Provider store={store}>
        <div className="App">     
          <LoginForm />   
        </div>
    </Provider>
  );
}

export default App;
