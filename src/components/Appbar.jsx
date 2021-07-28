import React, { useState } from 'react';
import { AzureAD, AuthenticationState } from 'react-aad-msal';
import { authProvider } from '../Auth/authProvider';
import {
    Toolbar,
    Typography,
    Button,
    AppBar,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    IconButton,
    Avatar,
    Link
} from '@material-ui/core';
import { useHistory, Redirect } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { SettingsRemote, SettingsEthernet, ExitToApp, Build, Home } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontWeight: 'bold',
        fontFamily: 'Courier new'
    },
}));


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: 'rgba(85,115,95,1)',
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const Appbar = () => {

    const classes = useStyles();
    let history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleOption = (option) => {
        history.push(option);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (

        <AzureAD provider={authProvider}>
            {
                ({ logout, authenticationState, accountInfo }) => {

                    switch (authenticationState) {
                        case AuthenticationState.Unauthenticated:
                            return (
                                <Redirect to='/login'/>
                            );
                        case AuthenticationState.Authenticated:
                            return (
                                <AppBar position="static" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,1) 35%, rgba(85,115,95,1) 100%)' }}>
                                    <Toolbar>
                                        <IconButton onClick={() => handleOption("/")}>
                                            <Avatar src="/Logo_small.png" />
                                        </IconButton>
                                        <Typography variant="h5" className={classes.title} onClick={() => handleOption("/")}>
                                            <Link href="" onClick={() => handleOption("/")} color="inherit" underline="none">
                                                SUMMA SERVER SOLUTION
                                            </Link>
                                        </Typography>
                                        <Tooltip title="Usuario actual">
                                            <Button color="inherit">{accountInfo.account.name}</Button>
                                        </Tooltip>
                                        <Tooltip title="Menú">
                                            <Button aria-controls="customized-menu" aria-haspopup="true" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick}>
                                                <MenuIcon />
                                            </Button>
                                        </Tooltip>
                                        <StyledMenu
                                            id="customized-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <StyledMenuItem onClick={() => handleOption("/")}>
                                                <ListItemIcon>
                                                    <Home fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="Home" />
                                            </StyledMenuItem>
                                            <StyledMenuItem onClick={() => handleOption("/admin")}>
                                                <ListItemIcon>
                                                    <Build fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="Admin" />
                                            </StyledMenuItem>
                                            <StyledMenuItem>
                                                <ListItemIcon>
                                                    <SettingsRemote fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="Windows Remote Client" />
                                            </StyledMenuItem>
                                            <StyledMenuItem>
                                                <ListItemIcon>
                                                    <SettingsEthernet fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="Test" />
                                            </StyledMenuItem>
                                            <StyledMenuItem>
                                                <ListItemIcon>
                                                    <SettingsEthernet fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="cURL Test" />
                                            </StyledMenuItem>
                                            <StyledMenuItem>
                                                <ListItemIcon>
                                                    <SettingsEthernet fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="Monitoring" />
                                            </StyledMenuItem>
                                            <StyledMenuItem onClick={logout}>
                                                <ListItemIcon>
                                                    <ExitToApp fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="Logout" />
                                            </StyledMenuItem>
                                        </StyledMenu>
                                    </Toolbar>
                                </AppBar>
                            )
                    }   
                }
            }
        </AzureAD>       
    );
}

export default Appbar;