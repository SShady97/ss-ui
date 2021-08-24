import React, { Fragment } from 'react';

import { Grid, Container, Box, Divider, makeStyles } from '@material-ui/core';

import Appbar from '../Appbar';
import Select from './Select';
import DBTable from './DBTable/DBTable';

const options = [
    { name: "Usuarios de Ejeccución" },
    { name: "Servidores" },
    { name: "Acciones" },
    { name: "Parametros" },
    { name: "Cola de Procesos" },
];

const useStyles = makeStyles((theme) => ({
    background: {
        borderRadius: 10,
        margin: '5%',
        width: '90%',
        backgroundColor: theme.palette.text.disabled,
    }
}));

const Admin = () => {

    const classes = useStyles();

    const [tableSelect, setTableSelect] = React.useState("Usuarios de Ejeccución");

    const handleTableChange = (text) => {
        setTableSelect(text);
    };

    return (
        <Fragment>
            <Appbar />
            <Container width="100%" style={{ marginTop: '20px', }}>
                <Grid container direction="column" spacing={3} className={classes.background}>
                    <Grid item>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={3}
                        >
                            <Grid item >
                                Selecionar tabla:
                            </Grid>
                            <Grid item xs={6}>
                                <Box>
                                    <Select options={options} onChange={handleTableChange} value={tableSelect} />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid item>
                        <DBTable table={tableSelect} />
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
}

export default Admin;