import { logIn, closeLoginModal, openLoginModal, logout } from '../../store';
import { connect } from 'react-redux';
import { GenericState } from '../../store';
import { LoginPayload } from '../../constants/types';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Grid, Modal, Button } from '@material-ui/core';
import './authArea.scss'


interface Props{
  readonly errorMassage: string,
  readonly isAuthorized: boolean
  readonly isOpen: boolean,
  readonly onOpen: Function,
  readonly onClose: Function,
  readonly onLogin: Function,
  readonly onLogOut: Function
}

const AuthArea: React.FC<Props> = ({onLogin, errorMassage, isOpen, onClose, onOpen, isAuthorized, onLogOut}) => {
 
  const [loginFormState, hanldeChange] = useState<LoginPayload>(() => ({"userName": "", "password": ""}));
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    hanldeChange({...loginFormState, [name]: value});    
}
  
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     onLogin(loginFormState);
  }

  const isError: boolean = errorMassage.length!? true : false;
  

  return (
    <Grid xl={1}  xs={4} item container spacing={0} justify='flex-end' >     
      <Button variant='contained' color='secondary'onClick={()=>{isAuthorized? onLogOut():onOpen()}} >{isAuthorized? 'LogOut':'LogIn'}</Button>
      <Modal
      open={isOpen}
      onClose={()=>{onClose()}}>
          <form style={{backgroundColor:'#3F3F3F'}} className='modalForm loginForm' onSubmit = { onFormSubmit }> 
              { isError ? <span className = "warningMassange">{errorMassage}</span> : null}
                <input placeholder="UserName..." name="userName" required value={loginFormState.userName} onChange={handleInputChange}/>
                <input placeholder="Password..." name="password" required value={loginFormState.password} type="password" onChange={handleInputChange}/>
                <button>Sign In</button>
          </form>
      </Modal>
    </Grid>
  );
}

const mapStateToProps = (state: GenericState) => ({
    errorMassage: state.auth.errorMassage,
    isOpen: state.auth.isModalOpen,
    isAuthorized: state.auth.userName.length!==0
})

const mapDispathToProps = {
  onOpen: openLoginModal,
  onLogin: logIn,
  onClose: closeLoginModal,
  onLogOut: logout
}

export default connect(
    mapStateToProps,
    mapDispathToProps
    )(AuthArea);
