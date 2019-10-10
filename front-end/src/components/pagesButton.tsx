import React from 'react';
import { Grid } from '@material-ui/core';

interface Prop {
    readonly value: number,
    readonly onCl: Function
}

export const PageButton: React.FC<Prop> = (props) => {
    return (
        <Grid item lg={1}>
            <button onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{props.onCl(props.value)}}>{props.value}</button>
        </Grid>
    )
}
