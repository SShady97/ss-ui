import React, {useState} from 'react';
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
    Avatar
}  from '@material-ui/core';
import { useHistory } from "react-router-dom";
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
        <AppBar position="static" style={{background: 'linear-gradient(90deg, rgba(0,0,0,1) 35%, rgba(85,115,95,1) 100%)'}}>
        <Toolbar>
            <IconButton onClick={() => handleOption("/")}>
                <Avatar src="/Logo_small.png" />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                SUMMA SERVER SOLUTION
            </Typography>
            <Tooltip title="Iniciar Sesión">
                <Button color="inherit">Login</Button>
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
                <StyledMenuItem>
                    <ListItemIcon>
                        <ExitToApp fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </StyledMenuItem>
            </StyledMenu> 
        </Toolbar>
      </AppBar>
    );
}
 
export default Appbar;