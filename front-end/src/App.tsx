import Main from './components/main';
import React from 'react';
import store from './store'
import Header from './components/header/header';
import { Provider } from 'react-redux';
import { Grid } from '@material-ui/core';
import LoginForm from './containers/loginForm/loginFormContainer';

const App: React.FC = () => {
  return (
    <Provider store={store}>      
        <Grid container direction='column'>
          <Header/>
          <Main/>
          <LoginForm/>
        </Grid>      
    </Provider>
  );
}

export default App;
