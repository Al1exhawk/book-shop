import { Route, Redirect, RouteProps } from 'react-router-dom';
import React from 'react'

interface OwnProps {
    ?omponent: any,
    role: string,
}
type Props = OwnProps & RouteProps;

const PrivateRoute: React.FC<Props> = ({ ?omponent, role, ...rest }) => {
    return (
        <Route {...rest} render={(props) => {
            return role === 'admin' ? <?omponent {...props} /> : <Redirect to='/' />
        }} />
    )
}

export default PrivateRoute;
