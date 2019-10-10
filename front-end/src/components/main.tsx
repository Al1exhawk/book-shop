import React from 'react';
import ItemContainer from '../containers/items/itemsContainer'
import ItemFilter from '../containers/itemFilter/itemFilterContainer'
import { Grid } from '@material-ui/core';

const Main: React.FC = () => {
    return (
        <Grid item container direction='column' >
            <ItemFilter/>
            <ItemContainer/>
        </Grid>

    )
}

export default Main;
