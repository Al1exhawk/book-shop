import React, { useState, FormEvent, ChangeEvent } from 'react';
import { LoginPayload } from '../constants/types';

interface Props {
  onLoginClick: Function,
  errorMassage: string,
}


const LoginForm: React.FC<Props> = props => {
 
  const [loginFormState, hanldeChange] = useState<LoginPayload>(() => ({"userName": "", "password": ""}));
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    hanldeChange({...loginFormState, [name]: value});    
}

  const onFormSbmit = (e: FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     props.onLoginClick(loginFormState);
  }

  const warningMassangeStyles = {
    display: props.errorMassage.length? 'inline': 'none'
  };

  return (    
      <form className ="form-group loginForm" onSubmit = { onFormSbmit }>
            <span className = "warningMassange " style = {warningMassangeStyles}>{props.errorMassage}</span>
            <input className ="form-control loginFormInput" placeholder="UserName..." name="userName" value={loginFormState.userName} onChange={handleInputChange}/>
            <input className ="form-control loginFormInput" placeholder="Password..." name="password" value={loginFormState.password} type="password" onChange={handleInputChange}/>
            <button className ="form-control btn btn-primary loginFormInput"> LogIn</button>
      </form>  
  );
}

export default LoginForm;