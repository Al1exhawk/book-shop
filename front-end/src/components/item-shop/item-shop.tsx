import React from 'react';
import { ItemContainer, ItemFilter } from '../../containers'
import { Grid } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';

type Props = RouteComponentProps;

const ItemShop: React.FC<Props> = (props) => {
    
    return (       
        <Grid item container  direction='column' >
            <ItemFilter/>
            <ItemContainer/>
        </Grid>
    )
}

export default ItemShop;