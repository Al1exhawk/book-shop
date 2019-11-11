import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { Menu, MenuItem, IconButton, Link } from '@material-ui/core';

const AdminMenu = () => {
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);

   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <div>
         <IconButton color='secondary' onClick={handleClick}>
            <MenuIcon />
         </IconButton>
         <Menu
            keepMounted
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
         >
            <MenuItem onClick={handleClose}>
               <Link href='/'>Shop</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
               <Link href='/items'>Item Table</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
               <Link href='/authors'>Author Table</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
               <Link href='/users'>User Table</Link>
            </MenuItem>
         </Menu>
      </div>
   );
};

export default AdminMenu;
