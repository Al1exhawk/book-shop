import React from 'react';
import { Grid } from '@material-ui/core';
import'./header.scss';
import { RegistrationArea, BagArea, AuthArea } from 'containers'
import { connect } from 'react-redux';
import { GenericState } from 'store';


  
interface PropsFromState {
    readonly userRole: string;
}

type Props = PropsFromState

const Header: React.FC<Props> = ({userRole}) => {
    return (   
        <Grid className='header' item container direction='row' justify='flex-end'>
            { userRole? <BagArea/>: <RegistrationArea/>}
            <AuthArea/>
        </Grid>
    );
}
const mapStateToProps = (state: GenericState) =>({
    userRole: state.auth.role,
  });

export default connect(mapStateToProps)(Header);