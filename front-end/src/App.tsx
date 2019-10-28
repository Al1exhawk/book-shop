import React from 'react';
import store from './store'
import { Header, Main } from './components';
import { Provider } from 'react-redux';
import { Grid } from '@material-ui/core';



const App: React.FC = () => {
  return (        
    <Provider store={store}>  
      <Grid container direction='column'>
          <Header />
          <Main/>
      </Grid>
    </Provider>
  );
}



export default App;
