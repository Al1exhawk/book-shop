import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

interface Props {
    item: {title: string, price: number, id: string, qty:number },   
    onDeleteClick: Function,
}


const BagItem: React.FC<Props> = ({ item, onDeleteClick}) => {
    return (
      <TableRow>
          <TableCell>{item.title}</TableCell>
          <TableCell>
          {item.qty}        
          </TableCell>
          <TableCell>{item.price}$</TableCell>
          <TableCell>
            {item.qty*item.price}
          </TableCell>
          <TableCell>
            <button onClick={() =>{onDeleteClick(item.id);}}>
              <HighlightOffIcon/>
            </button>
          </TableCell>
      </TableRow>

    )
}

export default BagItem;

