import React from 'react';
import AuthArea from '../../containers/authArea/authArea'
import { Grid } from '@material-ui/core';
import'./header.scss';
import BagArea from '../../containers/bagArea/bagArea'

const Header: React.FC = () => {
    return (   
        <Grid className='header' item container direction='row' spacing={0} justify='flex-end'>
            <BagArea/>
            <AuthArea/>
        </Grid>
    );
}

export default Header;