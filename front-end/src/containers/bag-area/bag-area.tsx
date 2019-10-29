import React from 'react'
import { connect } from 'react-redux'
import { Grid, Modal, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableFooter } from '@material-ui/core';
import { openBagModal, closeBagModal, GenericState, removeItemFromBag } from '../../store'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ItemModel } from '../../models';
import { BagItem } from '../../components';
import { stripeService, itemService } from '../../services'

interface PropsFromState {
    readonly bagItems: {id: string, amount: number}[],
    readonly isOpen: boolean,
   
}
interface PropsFromDispatch {
    readonly onOpen: typeof openBagModal,
    readonly onClose: typeof closeBagModal,
    readonly onDelete: typeof removeItemFromBag
}

type Props = PropsFromState & PropsFromDispatch;

const Bag: React.FC<Props> = ({isOpen, onClose, onOpen, bagItems, onDelete}) => {
    React.useEffect(()=>{
        stripeService.loadStrpe();
    },[])
    const [BItems, setItems] = React.useState<{
        items: Array<{item: ItemModel, amount: number}>,
        totalPrice: number}>({items:[], totalPrice: 0});
    
    const fetchItems = async () => {        
            const items = await itemService.getBagItems(bagItems);
            setItems(items);        
    } 
        
    React.useEffect(() => {
        fetchItems();
        }, [bagItems]);  
    const onPayClick = ()=>{
        stripeService.checkout(BItems.totalPrice);
        onClose();
    }
    return (
        <Grid  xs={4} item container justify='flex-end'>
            <button onClick={()=>{ onOpen()}}><ShoppingCartIcon/></button>
            <Modal
            open={isOpen}
            onClose={()=>{ onClose()}}>                
                <div className='modalForm'>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Product
                                    </TableCell>
                                    <TableCell>
                                        Qty
                                    </TableCell>
                                    <TableCell>
                                        Price
                                    </TableCell>
                                    <TableCell>
                                        Order Amount
                                    </TableCell>
                                    <TableCell/>
                                </TableRow>
                            </TableHead>                         
                                <TableBody>{                                  
                                    BItems.items.map((item)=>{                                        
                                        return <BagItem 
                                                key={item.item.id} 
                                                onDeleteClick={onDelete}
                                                item={{title:item.item.title,
                                                     price: item.item.price,
                                                     id: item.item.id,
                                                     qty: item.amount}}
                                                />})
                                    }                                 
                                </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell variant='head' align='center'>
                                        Total Price: {BItems.totalPrice}$
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                        <button onClick={onPayClick}>Check Out</button>
                    </Paper>
                </div>
            </Modal>
        </Grid>
    )
}

const mapStateToProps = (state: GenericState) => ({
    bagItems: state.bag.items,
    isOpen: state.bag.isModalOpen
})

const mapDipatchToProps = {
    onOpen: openBagModal,
    onClose: closeBagModal,
    onDelete: removeItemFromBag
}

export default connect(mapStateToProps, mapDipatchToProps)(Bag)