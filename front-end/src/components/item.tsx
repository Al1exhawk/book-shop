import React from 'react';
import { Grid, Card, CardMedia, CardHeader, CardContent, Typography, CardActions } from '@material-ui/core';

interface ItemProp {
    readonly title: string,
    readonly authors: string,
    readonly id: string,
    readonly price: number,
    readonly type: string
    
}

export const Item: React.FC<ItemProp> = (prop) => {
    return (
        <Grid item xl={3} lg={4} xs={12} sm={6}>
                <Card className="item">                        
                    <CardMedia 
                        style={{padding: '50%'}}
                        image='https://www.ppf.co.uk/sites/default/files/image-2018-12/purple-book-default-image-final-two.jpg'/>                    
                    <CardHeader
                        title={prop.title}
                        subheader={`${prop.authors}`}/>
                    <CardContent>                        
                        <Typography paragraph>Type: {prop.type}</Typography>
                        <Typography paragraph>Price: {prop.price}$</Typography>
                        <Typography paragraph>Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, maxime!</Typography>
                    </CardContent>
                    <CardActions>
                        <button className='addToCardButton' onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{}}>add to card</button>
                    </CardActions>
                </Card>
        </Grid>
    )
}