import { Route, Redirect, RouteProps} from 'react-router-dom';
import React from 'react'

interface OwnProps {
    Comp:  any,
    role: string,
    exact: boolean,
    path: string
}
type Props = OwnProps & RouteProps;

const PrivateRoute:React.FC<Props> = ({Comp, role, ...rest}) => {
    return (
        <Route {...rest} render={(props)=>{
            return role === 'admin' ?<Comp {...props}/>: <Redirect to='/'/>
        }} />
    )
}

export default PrivateRoute;
