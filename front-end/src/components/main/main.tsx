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
                <Route  path='/confirm/:token' component={ConfirmationPage} />
                <PrivateRoute exact path='/authors' role={props.role} Сomponent={AuthorTable}/>
                <PrivateRoute path='/authors/add' role={props.role} Сomponent={AddAuthorForm}/>
                <PrivateRoute path='/authors/edit/:id' role={props.role} Сomponent={EditAuthorForm}/>

                <PrivateRoute exact path='/users' role={props.role} Сomponent={ UserTable }/>
                <PrivateRoute path='/users/edit/:id' role={props.role} Сomponent={ EditUserForm }/>                
                <PrivateRoute path='/users/add' role={props.role} Сomponent={ AddUserForm }/>        

                <PrivateRoute exact path='/items' role={props.role} Сomponent={ ItemTable }/>
                <PrivateRoute path='/items/add' role={props.role} Сomponent={ AddItemForm }/>
                <PrivateRoute path='/items/edit/:id' role={props.role} Сomponent={ EditItemForm }/>
            </Switch>
        
    )
}

export default Main;
