import React, { useEffect } from 'react';
import { ItemContainer, ItemFilter } from 'containers'
import { Grid } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';

type Props = RouteComponentProps<{token?: string}>;

const ItemShop: React.FC<Props> = (props) => {
    useEffect(() => {
        console.log('props.match.params', props.match.params.token)
    }, [])
    return (       
        <Grid item container  direction='column' >
            <ItemFilter/>
            <ItemContainer/>
        </Grid>
    )
}
export default ItemShop;