import React from 'react';
import { ItemContainer, ItemFilter } from '../containers'
import { Grid } from '@material-ui/core';
import { RouteProps } from 'react-router-dom';

type allProps = RouteProps;

const ItemShop: React.FC<allProps> = (props) => {
    return (       
        <Grid item container  direction='column' >
            <ItemFilter/>
            <ItemContainer/>
        </Grid>
           
    )
}

export default ItemShop;