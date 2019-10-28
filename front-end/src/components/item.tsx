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

const Item: React.FC<ItemProp> = ({ id , authors, isAuthorized, addtoBag, price, title, type}) => {

    const onAddClick = async (e:React.MouseEvent<HTMLButtonElement>)=> {
        e.preventDefault();
        addtoBag(id);
    }
    return (
        <Grid item xl={3} lg={4} xs={12} sm={6}>
                <Card className="item">                        
                    <CardMedia 
                        style={{padding: '50%'}}
                        image='https://www.iwillteachyoutoberich.com/wp-content/themes/iwt/assets/img/book/book_v2.JPG'/>                    
                    <CardHeader
                        title={title}
                        subheader={`${authors}`}/>
                    <CardContent>                        
                        <Typography paragraph>Type: {type}</Typography>
                        <Typography paragraph>Price: {price}$</Typography>
                        <Typography paragraph>Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, maxime!</Typography>
                    </CardContent>

                    {isAuthorized===false? null: <CardActions>
                        <button className='addToCardButton' onClick={onAddClick}><AddShoppingCartIcon/></button>
                    </CardActions>}
                </Card>
        </Grid>
    )
}

export default Item;