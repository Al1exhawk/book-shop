import React from 'react';
import AuthArea from '../../containers/loginForm/loginForm'
import { Grid } from '@material-ui/core';
import'./header.scss';

const Header: React.FC = () => {
    return (   
        <Grid className='header' item container direction='row' justify='flex-end'>    
            <AuthArea/>           
        </Grid>
    );
}

export default Header;