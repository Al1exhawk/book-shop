import { logIn } from '../store';
import { connect } from 'react-redux';
import { GenericState } from '../store';
import { LoginPayload, IRoutProps } from '../constants/types';
import React, { useState, FormEvent, ChangeEvent } from 'react';

interface Props extends IRoutProps{
  readonly onLoginClick: Function,
  readonly errorMassage: string,
}

const LoginForm: React.FC<Props> = ({onLoginClick, errorMassage, location, match, history}) => {
 
  const [loginFormState, hanldeChange] = useState<LoginPayload>(() => ({"userName": "", "password": ""}));
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    hanldeChange({...loginFormState, [name]: value});    
}
  
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     onLoginClick(loginFormState, history);
  }

  const isError: boolean = errorMassage.length!? true : false;
  

  return (    
      <form className ="form-group loginForm" onSubmit = { onFormSubmit }>
        
           { isError ? <span className = "warningMassange">{errorMassage}</span> : null}
            <input className ="form-control loginFormInput" placeholder="UserName..." name="userName" value={loginFormState.userName} onChange={handleInputChange}/>
            <input className ="form-control loginFormInput" placeholder="Password..." name="password" value={loginFormState.password} type="password" onChange={handleInputChange}/>
            <button className ="form-control btn btn-primary loginFormInput"> LogIn</button>
      </form>  
  );
}

const mapStateToProps = (state: GenericState) => ({
    errorMassage: state.auth.errorMassage
})

const mapDispathToProps = {
    onLoginClick: logIn
}

export default connect(
    mapStateToProps,
    mapDispathToProps
    )(LoginForm);
