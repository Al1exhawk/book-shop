import React from 'react'
import { RouteComponentProps } from 'react-router';
import { Modal} from '@material-ui/core';
import { userService } from 'services';
import { UserModel } from 'models';


type TParams = { token: string };

type Props = RouteComponentProps<TParams>;

const ConfirmationPage: React.FC<Props> = (props) => {
    const [isOpen, tougle] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<UserModel>();

    const confirmMe = async () =>{
    try{
       const user = await userService.confirmUser(props.match.params.token);
       setUser(user);
    }  catch (e) {
       console.log('e', e.response)
    }

    }
    React.useEffect(()=>{
        confirmMe();
        tougle(true);

    },[]);
    const onClose = () => {
        tougle(false);
        props.history.push('/');
    }
    return (
        <Modal 
        open={isOpen}
        onClose={()=>{onClose()}}>  
            <div className='modalForm'>
                <h2>Your account successfully confirmed</h2>
            </div>            
        </Modal>
    )
}

export default ConfirmationPage;