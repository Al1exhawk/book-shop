import React from 'react';
import { BrowserRouter as Switch, Route} from 'react-router-dom';
import { ItemShop, EditUserForm, PrivateRoute, AddAuthorForm, AddUserForm, EditAuthorForm, AddItemForm, EditItemForm, ConfirmationPage} from '../';
import { UserTable, AuthorTable, ItemTable } from 'containers';

interface OwnProps {
    role: string
}

type Props = OwnProps ;


const Main: React.FC<Props> = (props) => {
    return (
            <Switch>
                <Route  path='/' exact component={ItemShop}/>
                <Route  path='/:token' component={ConfirmationPage} />
                <PrivateRoute  path='/authors' exact role={props.role} Сomponent={AuthorTable}/>
                <PrivateRoute  path='/authors/add' exact role={props.role} Сomponent={AddAuthorForm}/>
                <PrivateRoute path='/authors/edit/:id' role={props.role} Сomponent={EditAuthorForm}/>

                <PrivateRoute  path='/users' role={props.role} exact Сomponent={ UserTable }/>
                <PrivateRoute path='/users/edit/:id' role={props.role} Сomponent={ EditUserForm }/>                
                <PrivateRoute exact path='/users/add' role={props.role} Сomponent={ AddUserForm }/>        

                <PrivateRoute exact path='/items' role={props.role} Сomponent={ ItemTable }/>
                <PrivateRoute exact path='/items/add' role={props.role} Сomponent={ AddItemForm }/>
                <PrivateRoute path='/items/edit/:id' role={props.role} Сomponent={ EditItemForm }/>
            </Switch>
        
    )
}

export default Main;
