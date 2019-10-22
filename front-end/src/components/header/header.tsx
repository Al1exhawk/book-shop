import React from 'react';
import { Grid } from '@material-ui/core';
import'./header.scss';
import { RegistrationArea, BagArea, AuthArea } from '../../containers'

const Header: React.FC = () => {
    return (   
        <Grid className='header' item container direction='row' justify='flex-end'>       
            <RegistrationArea/>
            <BagArea/>
            <AuthArea/>
        </Grid>
    );
}

export default Header;