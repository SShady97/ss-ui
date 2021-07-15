import React, { Fragment } from 'react';

import { Grid, Container } from '@material-ui/core';

import Appbar from '../Appbar';


const Admin = () => {
    return (
        <Fragment>
            <Appbar />
            <Container maxWidth="xl" style={{ marginTop: '20px', }}>
                <Grid container spacing={3} style={{ borderRadius: 10, margin: '5%', width: '90%', backgroundColor: 'Gainsboro' }}>
                    <Grid item>
                        <h3>Tabla:</h3>
                    </Grid>
                    <Grid item>

                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
}

export default Admin;