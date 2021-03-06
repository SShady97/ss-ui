import React, { Fragment } from 'react';

import { AzureAD, AuthenticationState } from 'react-aad-msal';
import { authProvider } from '../../Auth/authProvider';
import { Redirect } from "react-router-dom";
import { makeStyles, withStyles, Grid, Box, Button } from '@material-ui/core';

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#517461'),
        backgroundColor: '#517461',
        '&:hover': {
            backgroundColor: '#517461',
        },
    },
}))(Button);

const useStyles = makeStyles((theme) => ({
    '@global': {
        body: {
            backgroundColor: "#517461"
        }
    },
    box: {
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.5)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.5)"
        },
        width: "70vh",
        height: "50vh",
        display: "flex",
        justifyContent: "center",
    },
}));


const Login = () => {

    const classes = useStyles();

    return (
        <AzureAD provider={authProvider}>
            {
                ({ login, authenticationState }) => {

                    switch (authenticationState) {
                        case AuthenticationState.Authenticated:
                            return (
                                <>
                                    <Redirect to='/' />
                                </>
                            );
                        default:
                            return (
                                <Fragment>
                                    <Box className={classes.box} m="auto" style={{ marginTop: '20vh', backgroundColor: 'white' }}>
                                        <Grid
                                            container
                                            direction="column"
                                            justifyContent="center"
                                            alignItems="center"
                                            mt={20}
                                            color="White"
                                            spacing={4}
                                        >
                                            <Grid item>
                                                <img src="/App_Icon.png" alt="" width="427" height="57" />

                                            </Grid>
                                            <Grid item>
                                                <Box textAlign='center' mt={4} display="flex" flexDirection="row-reverse">
                                                    <ColorButton variant='contained' onClick={login}>
                                                        Iniciar Sesi??n
                                                    </ColorButton>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box m="auto" mt={13} display="flex" justifyContent="center">
                                        <img src="/footer_login.png" alt="" width="268" height="43" />
                                    </Box>
                                </Fragment >
                            )
                    }
                }
            }
        </AzureAD>
    );
}

export default Login;