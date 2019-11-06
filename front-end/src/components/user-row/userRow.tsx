import React from 'react'
import { TableRow, TableCell, Typography, IconButton  } from '@material-ui/core'
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

 const UserRow: React.FC<Prop> = (props) => {
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
                   { props.isConfirm===true? 'confirmed' : 'not confirmed'}
                </Typography>
            </TableCell>
            {props.role === 'admin'? null:
            <TableCell>
                <IconButton onClick={()=>{props.onEditClick(props.id)}}><EditIcon/></IconButton>
                <IconButton onClick={()=>{props.onDeleteClick(props.id)}}><DeleteIcon/></IconButton>
            </TableCell>}
        </TableRow>
    )
}

export default UserRow;
