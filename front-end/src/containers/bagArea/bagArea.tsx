import React from 'react'
import {connect} from 'react-redux'
import { Grid, Modal } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {openBagModal, closeBagModal, GenericState} from '../../store'
import { ItemModel } from '../../../../back-end/src/models';

interface Props {
    readonly isOpen: boolean,
    readonly isAuthorized: boolean,
    readonly bagItems: ItemModel[],
    readonly onOpen: Function,
    readonly onClose: Function
}

const BagArea: React.FC<Props> = ({isOpen, onClose, onOpen}) => {

    return (
        <Grid xl={1} xs={4} item container spacing={0} justify='flex-end'>
            <button onClick={()=>{ onOpen()}}><ShoppingCartIcon/></button>
            <Modal
            open={isOpen}
            onClose={()=>{ onClose()}}>                
                <form>
                    
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