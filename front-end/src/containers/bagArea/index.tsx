import React, { ChangeEvent } from 'react'
import {connect} from 'react-redux'
import { Grid, Modal, Table, TableBody, TableCell, TableHead, TableFooter, TableRow, Paper } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {openBagModal, closeBagModal, GenericState} from '../../store'
import { ItemModel } from '../../../../back-end/src/models';
import { BagItem } from '../../components/bagItem';

interface Props {
    readonly isOpen: boolean,
    readonly isAuthorized: boolean,
    readonly bagItems: ItemModel[],
    readonly onOpen: Function,
    readonly onClose: Function
}

const BagArea: React.FC<Props> = ({isOpen, onClose, onOpen, bagItems}) => {

    return (
        <Grid  xs={4} item container justify='flex-end'>
            <button onClick={()=>{ onOpen()}}><ShoppingCartIcon/></button>
            <Modal
            open={isOpen}
            onClose={()=>{ onClose()}}>                
                <form className='modalForm'>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Product
                                    </TableCell>
                                    <TableCell>
                                        Amount
                                    </TableCell>
                                    <TableCell>
                                        Price
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    bagItems.map((item)=>{
                                        return <BagItem onChange={(e: ChangeEvent<HTMLInputElement>)=>{

                                        }} item={item}/>
                                    })
                                }
                                
                            </TableBody>
                        </Table>
                    </Paper>
                </form>
            </Modal>
        </Grid>
    )
}

const mapStateToProps = (state: GenericState) => ({
    isAuthorized: state.auth.userName.length!==0,
    bagItems: state.bag.items,
    isOpen: state.bag.isModalOpen
})

const mapDipatchToProps = {
    onOpen: openBagModal,
    onClose: closeBagModal
}

export default connect(mapStateToProps, mapDipatchToProps)(BagArea)