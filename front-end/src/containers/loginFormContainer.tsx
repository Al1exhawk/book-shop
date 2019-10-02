import { logIn } from '../actions/auth-action-creators';
import { connect } from 'react-redux';
import LoginForm from '../components/loginForm';
import { AuthState } from '../constants/types'



const mapStateToProps = (state: AuthState) => ({
    errorMassage: state.errorMassage
})

const mapDispathToProps = {
    onLoginClick: logIn
}

export default connect(
    mapStateToProps,
    mapDispathToProps
    )(LoginForm);
