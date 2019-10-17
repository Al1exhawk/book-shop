import React from 'react';
import AuthArea from '../../containers/authArea'
import { Grid } from '@material-ui/core';
import'./header.scss';
import BagArea from '../../containers/bagArea'
import { RegistrationArea } from '../../containers/signUpArea'

const Header: React.FC = () => {
    return (   
        <Grid className='header' item container direction='row'justify='flex-end'>
       
            <RegistrationArea/>
            <BagArea/>
            <AuthArea/>
           

        </Grid>
    );
}

export default Header;