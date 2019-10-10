import React, {useEffect, useState} from 'react';
import { ItemModel } from '../../../../back-end/src/models';
import axios from 'axios';
import { connect } from 'react-redux';
import { GenericState } from '../../store'
import { Grid } from '@material-ui/core';
import {Item} from '../../components/item';
import {setNewPage} from '../../store'
import './items.scss';
import { PageButton } from '../../components/pagesButton';


interface Props{  
    readonly itemFilter: any,
    readonly setPage: Function
}

const Items: React.FC<Props> = (props) => {
    const [items, setItems] = useState<ItemModel[]>([]);
    const [pages, setPages] = useState([1]);
    
    const fetchItems = async () =>{
       const serverResponse = await axios.post("http://localhost:80/items", props.itemFilter, { responseType: "json" });
       const pagingModel = serverResponse.data;
       const itemsArr:ItemModel[] = pagingModel.content;
       const pagesNumber: number = pagingModel.pages;
    
       setItems(itemsArr);
        const pageButtonsArr: number[] = [] 
       for(let i: number = 0; i<pagesNumber; i++) {
            pageButtonsArr.push(i)
       }
       console.log('pageButtonsArr', pageButtonsArr);
       setPages(pageButtonsArr)
    }

    useEffect(() => {
        fetchItems();
        }, [props.itemFilter]);
       
    return(
        <Grid item container  direction='column'>
            <Grid item container direction='row' wrap='wrap' className='items'>
                {items.length? items.map((item: ItemModel) => {       
                    const authorsString: string = item.authors.reduce((prev:string,author)=>{
                    const string = ` ${prev} ${author.firstName}`;
                    return string;  
                    },'');                    
                return <Item key={item.id} price={item.price} type={item.type} id={item.id} title={item.title} authors={authorsString}/>
                }): null}
            </Grid>
            <Grid item container direction='row'>         
                {pages.map((page) => {
                return <PageButton key={page} value={page} onCl={props.setPage}/>
                })}
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state: GenericState) => ({
    itemFilter: state.itemFilter
})

const mapDispatch = {
    setPage: setNewPage 
}

export default connect(mapStateToProps, mapDispatch)(Items);
