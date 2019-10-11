import { logIn } from '../../store';
import { connect } from 'react-redux';
import { GenericState } from '../../store';
import { LoginPayload } from '../../constants/types';
import React, { useState, FormEvent, ChangeEvent } from 'react';


interface Props{
  readonly onLoginClick: Function,
  readonly errorMassage: string,
  readonly isOpen: boolean
}

const LoginForm: React.FC<Props> = ({onLoginClick, errorMassage, isOpen}) => {
 
  const [loginFormState, hanldeChange] = useState<LoginPayload>(() => ({"userName": "", "password": ""}));
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    hanldeChange({...loginFormState, [name]: value});    
}
  
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     onLoginClick(loginFormState);
  }

  const isError: boolean = errorMassage.length!? true : false;
  

  return (    
      <form className ="" onSubmit = { onFormSubmit }>        
           { isError ? <span className = "warningMassange">{errorMassage}</span> : null}
            <input className ="" placeholder="UserName..." name="userName" value={loginFormState.userName} onChange={handleInputChange}/>
            <input className ="" placeholder="Password..." name="password" value={loginFormState.password} type="password" onChange={handleInputChange}/>
            <button className =""> LogIn</button>
      </form>  
  );
}

const mapStateToProps = (state: GenericState) => ({
    errorMassage: state.auth.errorMassage,
    isOpen: state.auth.isModalOpem
})

const mapDispathToProps = {
    onLoginClick: logIn
}

export default connect(
    mapStateToProps,
    mapDispathToProps
    )(LoginForm);
