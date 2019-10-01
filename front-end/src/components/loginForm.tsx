import React, { useState, FormEvent, ChangeEvent } from 'react';
import { LoginPayload } from '../constants/types';

interface Props {
  onLoginClick: Function
}


const LoginForm: React.FC<Props> = props => {
 
  const [inputsState, hanldeChange] = useState<LoginPayload>(() => ({"userName": "", "password": ""}));
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {

    const {name, value} = e.target;
    hanldeChange({...inputsState, [name]: value});
    
    
}

  const onFormSbmit = (e: FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     props.onLoginClick(inputsState);
  }

  return (    
      <form className="form-group loginForm" onSubmit = { onFormSbmit }>
            <input className="form-control loginFormInput" placeholder="UserName..." name="userName" value={inputsState.userName} onChange={handleInputChange}/>
            <input className="form-control loginFormInput" placeholder="Password..." name="password" value={inputsState.password} type="password" onChange={handleInputChange}/>
            <button className="form-control btn btn-primary loginFormInput"> LogIn</button>
      </form>  
  );
}

export default LoginForm;