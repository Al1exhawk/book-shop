import React from 'react'
import { TableRow, TableCell, Typography, IconButton  } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { ItemModel } from 'models';

interface Prop {
    item: ItemModel
    onDeleteClick: Function,
    onEditClick: Function
}

 const ItemRow: React.FC<Prop> = ({item, onDeleteClick, onEditClick}) => {
    return (
        <TableRow>
            <TableCell>
                <Typography>
                   { item.id}
                </Typography>
            </TableCell>

            <TableCell>
                <Typography>
                   { item.title}
                </Typography>
            </TableCell>

            <TableCell>
                <Typography>
                   { item.type}
                </Typography>
            </TableCell>

            <TableCell>
                <Typography>
                {item.authors.reduce((prev, curr)=>{
                        return `${prev} ${curr.firstName}`
                    },'')}
                </Typography>
            </TableCell>

            <TableCell>
                <Typography>
                   { item.price}
                </Typography>
            </TableCell>
            
            <TableCell>
                <IconButton onClick={()=>{onEditClick(item.id)}}><EditIcon/></IconButton>
                <IconButton onClick={()=>{onDeleteClick(item.id)}}><DeleteIcon/></IconButton>
            </TableCell>
        </TableRow>
    )
}

export default ItemRow;