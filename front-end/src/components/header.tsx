import React from 'react';
import AuthButton from './authButton'
import ItemFilter from '../containers/itemFilter/itemFilterContainer'

const Header: React.FC = () => {

    return (
        <div className="container">
            <AuthButton/>
            <ItemFilter/>
        </div>
    );
}

export default Header;