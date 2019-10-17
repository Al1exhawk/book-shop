import React, { ChangeEvent, FormEvent } from 'react'
import {connect} from 'react-redux'
import { Grid, Modal } from '@material-ui/core';
import {openRegistrationModal, closeRegistrationModal, registrationError, GenericState} from '../../store'
import { RegistrationModel } from '../../../../back-end/src/models';
import axios from 'axios';



interface Props {
    readonly onOpen: Function,
    readonly onClose: Function,
    readonly onError: Function
    readonly isOpen: boolean,
    readonly errorMessage:string,
    readonly isAuthorized: boolean
}

const Registration: React.FC<Props> = ({isOpen, onClose, onOpen, onError, errorMessage, isAuthorized}) => {

    const [signUpState, changeState] = React.useState<RegistrationModel>(() => ({'userName':'', 'password': '', 'email': '' }));
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        changeState({...signUpState, [name]: value});
    }

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        let serverResponse;
        try {
            serverResponse = await axios.post('http://localhost:80/registration', signUpState);            
        } catch (e) {
           
           return onError(e.response && e.response.data.message ? e.response.data.message: e.message)
        }
        return onClose();
    }

    return (
        isAuthorized? null :
        <Grid xs={4} item container justify='flex-end'>
            <button onClick={()=>{ onOpen()}}>Sign Up</button>
            <Modal
            open={isOpen}
            onClose={()=>{ onClose()}}>
                <form className='modalForm' onSubmit = { onFormSubmit }>       
                { errorMessage.length ? <span className = "warningMassange">{errorMessage}</span> : null}        
                    <input placeholder="UserName..." name="userName" required value={signUpState.userName} onChange={handleInputChange}/>
                    <input placeholder="Password..." name="password" required value={signUpState.password} type="password" onChange={handleInputChange}/>
                    <input placeholder="Email..." name="email" required value={signUpState.email} type="email" onChange={handleInputChange}/>
                    <button>Sign Up</button>
                </form>
            </Modal>
        </Grid>
    )
}

const mapStatetoProps = (state: GenericState) => ({
    isOpen: state.signUp.isModalOpen,
    errorMessage: state.signUp.errorMessage,
    isAuthorized: state.auth.userName.length!==0
    
})

const mapDipatchToProps = {
    onOpen: openRegistrationModal,
    onClose: closeRegistrationModal,
    onError: registrationError 
}

export const RegistrationArea = connect(mapStatetoProps, mapDipatchToProps)(Registration)