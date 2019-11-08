import React, { ChangeEvent, FormEvent } from 'react'
import {connect} from 'react-redux'
import {Modal, Button, Box } from '@material-ui/core';
import {openRegistrationModal, closeRegistrationModal, registrationError, GenericState} from 'store'
import { RegistrationModel } from 'models';
import { authService } from 'services';



interface PropsFromState {    
    readonly isOpen: boolean,
    readonly errorMessage:string,
}
interface PropsFromDispatch {
    readonly onOpen: typeof openRegistrationModal,
    readonly onClose: typeof closeRegistrationModal,
    readonly onError: typeof registrationError,
}

type Props = PropsFromState & PropsFromDispatch;

const Registration: React.FC<Props> = ({isOpen, onClose, onOpen, onError, errorMessage}) => {

    const [signUpState, changeState] = React.useState<RegistrationModel>(() => ({'userName':'', 'password': '', 'email': '' }));
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        changeState({...signUpState, [name]: value});
    }

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try {
            authService.registration(signUpState);
            onClose();

        } catch (e) {
           
           return onError(e.response && e.response.data.message ? e.response.data.message: e.message)
        }
    }

    return (
        <Box >
            <Button color='secondary' onClick={()=>{ onOpen()}}>Sign Up</Button>
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
        </Box>
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

export default connect(mapStatetoProps, mapDipatchToProps)(Registration)