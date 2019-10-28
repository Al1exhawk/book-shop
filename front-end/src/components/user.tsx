import React from 'react'
import { TableRow, TableCell, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

interface Prop {
    userName: string,
    email: string,
    isConfirm: boolean,
    role: string,
    id: string,
    onDeleteClick: Function,
    onEditClick: Function
}

 const User: React.FC<Prop> = (props) => {
    return (
        <TableRow>
            <TableCell>
                <Typography>
                   { props.userName}
                </Typography>
            </TableCell>

            <TableCell>
                <Typography>
                   { props.email}
                </Typography>
            </TableCell>

            <TableCell>
                <Typography>
                   { props.isConfirm}
                </Typography>
            </TableCell>

            <TableCell>
                <button onClick={()=>{props.onEditClick(props.id)}}><EditIcon/></button>
                <button onClick={()=>{props.onDeleteClick(props.id)}}><DeleteIcon/></button>
            </TableCell>
        </TableRow>
    )
}

export default User;
