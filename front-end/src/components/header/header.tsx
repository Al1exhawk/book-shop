import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import './header.scss';
import { RegistrationArea, BagArea, AuthArea } from 'containers';
import { connect } from 'react-redux';
import { GenericState } from 'store';
import { AdminMenu } from 'components/admin-menu';

interface PropsFromState {
   readonly userRole: string;
}

type Props = PropsFromState;

const Header: React.FC<Props> = ({ userRole }) => {
   return (
      <AppBar className='header'>
         <Toolbar>
            {userRole === 'admin' && <AdminMenu />}
            {userRole ? <BagArea /> : <RegistrationArea />}
            <AuthArea />
         </Toolbar>
      </AppBar>
   );
};
const mapStateToProps = (state: GenericState) => ({
   userRole: state.auth.role,
});

export default connect(mapStateToProps)(Header);
