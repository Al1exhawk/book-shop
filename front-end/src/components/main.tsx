import React from 'react';
import { ItemContainer, ItemFilter } from '../containers'
import { Grid } from '@material-ui/core';
const Main: React.FC = () => {
    return (
        <Grid item container  direction='column' >
            <ItemFilter/>
            <ItemContainer/>
        </Grid>

    )
}

export default Main;
