import React from 'react'
import { TableRow, TableCell, Typography, IconButton  } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { AuthorModel } from '../../models';

interface Prop {
    author: AuthorModel
    onDeleteClick: Function,
    onEditClick: Function
}

 const AuthorRow: React.FC<Prop> = ({author, onDeleteClick, onEditClick}) => {
    
    return (
        <TableRow>
            <TableCell>
                <Typography>
                   { author.firstName}
                </Typography>
            </TableCell>

            <TableCell>
                <Typography>
                   { author.lastName}
                </Typography>
            </TableCell>

            <TableCell>
                <Typography>
                    {author.items.reduce((prev, curr)=>{
                        return `${prev} ${curr.title}`
                    },'')}
                </Typography>
            </TableCell>

            <TableCell>
                <IconButton onClick={()=>{onEditClick(author.id)}}><EditIcon/></IconButton>
                <IconButton onClick={()=>{onDeleteClick(author.id)}}><DeleteIcon/></IconButton>
            </TableCell>
        </TableRow>
    )
}

export default AuthorRow;