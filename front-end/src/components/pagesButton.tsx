import React from 'react';
import { Grid } from '@material-ui/core';

interface Prop {
    readonly value: number,
    readonly onClick: Function
}

export const PageButton: React.FC<Prop> = (props) => {
    return (
        <Grid item>
            <button className='pageButtton' onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{props.onClick(props.value)}}>{props.value}</button>
        </Grid>
    )
}
