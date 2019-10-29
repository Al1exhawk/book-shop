import { itemService } from '../../services';
import React, {useEffect, useState} from 'react';
import {setNewPage, addItemToBag, GenericState} from '../../store'
import { ItemModel, QueryObjectModel } from '../../models';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Item, PageButton } from '../../components';
import './items.scss';

interface PropsFromState {  
    readonly itemFilter: QueryObjectModel,
    readonly isAuthorized: boolean

}
interface PropsFromDispatch {
    readonly setPage: typeof setNewPage,
    readonly addtoBag: typeof addItemToBag,
}

type Props = PropsFromState & PropsFromDispatch;

const Items: React.FC<Props> = (props) => {
    const [items, setItems] = useState<ItemModel[]>([]);
    const [pages, setPages] = useState([1]);
    
    const fetchItems = async () => {
       const paginatedModel = await itemService.getItems(props.itemFilter);
       const itemsArr = paginatedModel.content;
       const pagesNumber: number = paginatedModel.pages;
    
       setItems(itemsArr);
        const pageButtonsArr: number[] = [] 
       for(let i: number = 0; i<pagesNumber; i++) {
            pageButtonsArr.push(i+1)
       }
       setPages(pageButtonsArr)
    }

    useEffect(() => {
        fetchItems();
        }, [props.itemFilter]);
       
    return(
        <Grid item container spacing={1} direction='column'>
            <Grid item container direction='row' wrap='wrap' className='items'>
                {items.length? items.map((item: ItemModel) => {       
                    const authorsString: string = item.authors.length? item.authors.reduce((prev:string,author)=>{
                    const string = `${prev} ${author.firstName}`;                    
                    return string;  
                    },'by'): 'without author';                    
                return <Item 
                            key={item.id} 
                            price={item.price} 
                            type={item.type} 
                            id={item.id} 
                            title={item.title} 
                            authors={authorsString} 
                            item={item} 
                            addtoBag={props.addtoBag} 
                            isAuthorized={props.isAuthorized}/>
                }): null}
            </Grid>
            <Grid item container spacing={1} justify='center' wrap='wrap' direction='row'>         
                {pages.map((page) => {
                    return <PageButton key={page} value={page} onClick={props.setPage}/>
                })}
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state: GenericState) => ({
    itemFilter: state.itemFilter,
    isAuthorized: state.auth.userName.length!==0
})

const mapDispatch = {
    setPage: setNewPage,
    addtoBag: addItemToBag
}

export default connect(mapStateToProps, mapDispatch)(Items);
