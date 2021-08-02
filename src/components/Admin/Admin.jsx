import React, { Fragment } from 'react';

import { Grid, Container, Box, Divider } from '@material-ui/core';

import Appbar from '../Appbar';
import Select from './Select';
import DBTable from './DBTable/DBTable';

const options = [
    { name: "Login Users" },
    { name: "Execution Users" },
    { name: "Servers" },
    { name: "Scripts" },
    { name: "Parameters" },
    { name: "Processes" },
];

const Admin = () => {

    const [tableSelect, setTableSelect] = React.useState("Login Users");

    const handleTableChange = (text) => {
        setTableSelect(text);
    };

    return (
        <Fragment>
            <Appbar />
            <Container maxWidth="xl" style={{ marginTop: '20px', }}>
                <Grid container direction="column" spacing={3} style={{ borderRadius: 10, margin: '5%', width: '90%', backgroundColor: 'Gainsboro' }}>
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

                        <DBTable value={tableSelect} />
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
}

export default Admin;