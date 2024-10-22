import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import logo from './ex.png';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { IoMdHome } from "react-icons/io";
import { MdLogin, MdAttachMoney, MdEdit, MdVisibility, MdExitToApp, MdDashboard } from "react-icons/md"; 
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };
    const menuItems = [
        { text: 'Home', icon: <IoMdHome />, path: '/' },
        { text: 'Login', icon: <MdLogin />, path: '/login' },
        // { text: 'Add Expenses', icon: <MdAttachMoney />, path: '/addexpenses' },
        //{ text: 'Update Expenses', icon: <MdEdit />, path: '/UpdateExpense' },
        { text: 'View', icon: <MdVisibility />, path: '/view' },
        { text: 'Dashboard', icon: <MdDashboard />, path: '/dashboard' },

        { text: 'Logout', icon: <MdExitToApp />, path: '/login' },
    ];

    const drawer = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            
        >
            <List>
                {menuItems.map((item) => (
                    <ListItem button key={item.text} component={Link} to={item.path}>
                        {item.icon}
                        <ListItemText primary={item.text} sx={{ marginLeft: 3 }} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#04000d' }}>
                <Toolbar>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '20px' }} />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
                            Expense Tracker
                        </Typography>
                    </Link>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {menuItems.map((item) => (
                            <Link to={item.path} key={item.text} style={{ textDecoration: 'none' }}>
                                <Button style={{ color: 'white', marginLeft: '110px', display: 'flex', alignItems: 'center' }}>
                                    {item.icon}
                                    <span style={{ marginLeft: 'y' }}>{item.text}</span>
                                </Button>
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawer}
            </Drawer>
        </Box>
    );
};

export default Navbar;
