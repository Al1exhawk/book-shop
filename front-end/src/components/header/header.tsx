import React from 'react';
import AuthButton from '../authButton'
import { Grid } from '@material-ui/core';
import'./header.scss';

const Header: React.FC = () => {
    return (   
        <Grid className='header' item container direction='row' justify='flex-end'>    
            <AuthButton/>           
        </Grid>
    );
}

export default Header;