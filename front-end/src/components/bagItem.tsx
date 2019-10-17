import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import { ItemModel } from '../../../back-end/src/models';

interface Props {
    item: ItemModel
    onChange: Function
}

export const BagItem: React.FC<Props> = (props) => {
    return (
      <TableRow>
          <TableCell>{props.item.title}</TableCell>
          <TableCell><input min={1} defaultValue='1' type="number"/></TableCell>
          <TableCell>{props.item.price}</TableCell>
      </TableRow>

    )
}

