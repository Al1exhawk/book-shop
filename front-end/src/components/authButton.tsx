import React from 'react';
import { Grid, Button } from '@material-ui/core';

  const AuthButton: React.FC = () => {
      return (          
        <Grid xl={2} xs={4}  item container justify='flex-end'>
            <Button variant='contained' color='secondary'>LogIn</Button>
        </Grid>
      )
  }
  
  export default AuthButton;
  