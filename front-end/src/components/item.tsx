import React from 'react';
import { ItemModel } from '../../../back-end/src/models';
import { Grid, Card, CardMedia, CardHeader, CardContent, Typography, CardActions } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

interface ItemProp {
    readonly title: string,
    readonly authors: string,
    readonly id: string,
    readonly price: number,
    readonly type: string,
    readonly isAuthorized: boolean
    readonly item: ItemModel
    readonly addtoBag: Function
}

export const Item: React.FC<ItemProp> = (prop) => {
    return (
        <Grid item xl={3} lg={4} xs={12} sm={6}>
                <Card className="item">                        
                    <CardMedia 
                        style={{padding: '50%'}}
                        image='https://www.iwillteachyoutoberich.com/wp-content/themes/iwt/assets/img/book/book_v2.JPG'/>                    
                    <CardHeader
                        title={prop.title}
                        subheader={`${prop.authors}`}/>
                    <CardContent>                        
                        <Typography paragraph>Type: {prop.type}</Typography>
                        <Typography paragraph>Price: {prop.price}$</Typography>
                        <Typography paragraph>Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, maxime!</Typography>
                    </CardContent>

                    {prop.isAuthorized? <CardActions>
                        <button className='addToCardButton' onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{prop.addtoBag(prop.item)}}><AddShoppingCartIcon/></button>
                    </CardActions>: null}
                </Card>
        </Grid>
    )
}