import React from 'react';
import { Link } from 'react-router-dom'

  const AuthButton: React.FC = props => {
      return (          
            <Link to='/login'>
                <button className="btn btn-primary">LogIn</button>
            </Link>
      )
  }
  
  export default AuthButton;
  