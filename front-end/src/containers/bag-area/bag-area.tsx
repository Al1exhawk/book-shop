import React from 'react'
import {connect} from 'react-redux'
import { Grid, Modal, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableFooter } from '@material-ui/core';
import {openBagModal, closeBagModal, GenericState, removeItemFromBag} from '../../store'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ItemModel } from '../../../../back-end/src/models';
import { BagItem } from '../../components/bagItem';
import { StripeService } from '../../services'

interface Props {
    readonly bagItems: {item: ItemModel, amount: number}[],
    readonly isOpen: boolean,
    readonly isAuthorized: boolean,
    readonly onOpen: Function,
    readonly onClose: Function,
    readonly onDelete: Function
}
const stripeService = new StripeService();

const Bag: React.FC<Props> = ({isOpen, onClose, onOpen, bagItems, onDelete}) => {

    const [totalPrice, changeTotalPrice] = React.useState<number>(0);

    React.useEffect(()=>{
        stripeService.loadStrpe();
    },[])

    React.useEffect(() => {
        changeTotalPrice(+bagItems.reduce((previousValue,item)=>{
            return previousValue + (item.item.price*item.amount);
        }, 0).toFixed(2));
    
        }, [bagItems]);  
    const onPayClick = ()=>{
        stripeService.checkout(totalPrice);
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
                                    bagItems.map((item)=>{                                        
                                        return <BagItem 
                                                key={item.item.id} 
                                                onDeleteClick={onDelete}
                                                item={{title:item.item.title, price: item.item.price, id: item.item.id, qty: item.amount}}
                                                />})
                                    }                                 
                                </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell variant='head' align='center'>
                                        Total Price: {totalPrice}$
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
    isAuthorized: state.auth.userName.length!==0,
    isOpen: state.bag.isModalOpen
})

const mapDipatchToProps = {
    onOpen: openBagModal,
    onClose: closeBagModal,
    onDelete: removeItemFromBag
}

export default connect(mapStateToProps, mapDipatchToProps)(Bag)