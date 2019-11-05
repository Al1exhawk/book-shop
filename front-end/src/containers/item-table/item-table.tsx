import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import { GenericState, setNewPage } from '../../store';
import { ItemModel } from '../../models';
import { itemService } from '../../services';
import { Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography, IconButton, Container } from '@material-ui/core';
import { PageButton, ItemRow } from '../../components';
import { ItemFilterState } from '../../store';
import { RouteComponentProps } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';



interface PropsFromState {
    itemFilter: ItemFilterState
}

interface PropsFromDispatch {
    onPageClick: typeof setNewPage
}

type Props = PropsFromState & PropsFromDispatch & RouteComponentProps;

const ItemTable: React.FC<Props> = (props)=> {
    const [items, setItems] = useState<ItemModel[]>([]);
    const [pages, setPages] = useState([1]);

   const fetchUses = async () => {
    const pagingModel  = await itemService.getItems(props.itemFilter);
    const itemsArr = pagingModel.content;
    const pagesNumber: number = pagingModel.pages;

    setItems(itemsArr);
    const pageButtonsArr: number[] = [] 
    for(let i: number = 0; i<pagesNumber; i++) {
        pageButtonsArr.push(i+1);
    }
    setPages(pageButtonsArr);
   }   

    useEffect(()=>{
        fetchUses();
    },[props.itemFilter]);

    const onDeleteClick = (id: string) => {
        itemService.deleteItem(id);
    }

    const onEditClick = (id: string) => {
        props.history.push(`/items/edit/${id}`);    
    }

    const onAddClick =() =>{
        props.history.push('/items/add');    
    }
    
    return (
        <Container maxWidth='xl' >            
            <Grid item container>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant='h6' component='p'>
                                    ID
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant='h6' component='p'>
                                    Title
                                </Typography>                            
                            </TableCell>

                            <TableCell>
                                <Typography variant='h6' component='p'>
                                    Type
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant='h6' component='p'>
                                    Authors
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant='h6' component='p'>
                                    Price
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant='h6' component='p'>
                                    Edit
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <IconButton onClick={onAddClick}>
                                    <AddIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map(item => {
                                return <ItemRow key={item.id} item={item} onDeleteClick={onDeleteClick} onEditClick={onEditClick} />
                            })
                        }
                    </TableBody>
                </Table>  
            </Grid>
            <Grid item container justify='center' wrap='wrap' direction='row'>
                {pages.map((page)=>{
                    return <PageButton key={page} onClick={props.onPageClick} value={page}/>;
                })}
            </Grid>      
        </Container>
    )
}

const mapStateToProps = (state: GenericState) => ({
    itemFilter: state.itemFilter
});

const mapDispatchToProps = {
    onPageClick: setNewPage
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemTable);