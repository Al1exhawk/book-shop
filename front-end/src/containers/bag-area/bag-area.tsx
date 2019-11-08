import React from 'react'
import { connect } from 'react-redux'
import { Modal, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableFooter, IconButton, Box, Badge } from '@material-ui/core';
import { openBagModal, closeBagModal, GenericState, removeItemFromBag } from 'store'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { BagModel } from 'models';
import { BagItem } from 'components';
import { stripeService, itemService } from 'services'

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
    const [BItems, setItems] = React.useState<BagModel>({items:[], totalPrice: 0, totalAmount: 0});
    
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
        <Box >        
            <IconButton onClick={()=>{ onOpen()}}>
                <Badge badgeContent={BItems.totalAmount} color='primary'>
                    <ShoppingCartIcon/>
                </Badge>
            </IconButton>
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
        </Box>
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