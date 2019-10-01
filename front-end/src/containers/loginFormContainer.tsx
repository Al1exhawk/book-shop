import { logIn } from '../actions/auth-action-creators';
import { connect } from 'react-redux';
import LoginForm from '../components/loginForm';



// const mapStateToProps = (state) => {
    
// }

const mapDispathToProps = {
    onLoginClick: logIn
}

export default connect(null, mapDispathToProps)(LoginForm);
