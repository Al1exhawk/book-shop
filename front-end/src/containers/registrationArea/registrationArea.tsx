import React from 'react'
import {connect} from 'react-redux'
import { Grid, Modal } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {openBagModal, closeBagModal} from '../../store'


interface Props {
    readonly isOpen: boolean,
    readonly onOpen: Function,
    readonly onClose: Function
}

const RegistrationArea: React.FC<Props> = ({isOpen, onClose, onOpen}) => {

    return (
        <Grid xl={1} xs={4} item container spacing={0} justify='flex-end'>
            <button onClick={()=>{ onOpen()}}><ShoppingCartIcon/></button>
            <Modal
            open={isOpen}
            onClose={()=>{ onClose()}}>
                
                <h1>hi</h1>
            </Modal>
        </Grid>
    )
}


const mapDipatchToProps = {
    onOpen: openBagModal,
    onClose: closeBagModal
}

export default connect(null, mapDipatchToProps)(RegistrationArea)