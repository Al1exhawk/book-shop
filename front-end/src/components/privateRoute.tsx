import { Route, Redirect, RouteProps} from 'react-router-dom';
import React from 'react'

interface OwnProps {
    Сomponent :any,
    role: string,
}
type Props = OwnProps & RouteProps;

const PrivateRoute: React.FC<Props> = ({Сomponent, role, ...rest}) => {
    return (
        <Route {...rest} render={(props)=>{
            return role === 'admin' ?<Сomponent {...props}/>: <Redirect to='/'/>
        }} />
    )
}

export default PrivateRoute;
