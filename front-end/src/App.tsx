import React from 'react';
import { Header, Main } from './components';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { GenericState } from './store';

interface PropsFromState {
  role: string
}

type Props = PropsFromState;

const App: React.FC<Props> = (props) => {
  return (        
      <Grid className='App' item container direction='column'>
          <Header />
          <Main role={props.role}/>
      </Grid>
  );
}

const mapStateToProps = (state: GenericState) => ({
  role: state.auth.role,
})

export default connect(mapStateToProps)(App);
