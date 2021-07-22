import React, { Fragment } from 'react';

import { makeStyles, withStyles, Grid, Box, TextField, Button } from '@material-ui/core';

const FormTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#517461',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#517461',
        },
    },
})(TextField);

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
                        <form noValidate autoComplete="off">
                            <FormTextField id="user" label="Usuario" fullWidth={true} />
                            <FormTextField id="standard-basic" label="Contraseña" type="password" autoComplete="current-password" fullWidth={true} margin='dense' />
                        </form>
                        <Box textAlign='center' mt={4} display="flex" flexDirection="row-reverse">
                            <ColorButton variant='contained' color="blue">
                                Iniciar Sesión
                            </ColorButton>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box m="auto" mt={13} display="flex" justifyContent="center">
                <img src="/footer_login.png" alt="" width="268" height="43" />
            </Box>
        </Fragment >
    );
}

export default Login;