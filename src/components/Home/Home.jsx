import React, { Fragment } from 'react';

import { Grid, Container, Box, Accordion, Typography, makeStyles, AccordionSummary, AccordionDetails, Divider } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import Appbar from '../Appbar';
import Server from './Server';
import ExecutionUsers from './ExecutionUsers';
import Export from './Export';
import Action from './Action';
import ProcessQueque from './ProcessQueque';
import TasksQueque from './TasksQueque';
import SavedProcesses from './SavedProcesses';
import ResultsTable from './ResultsTable';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const Home = () => {

    const classes = useStyles();

    return (
        <Fragment>
            <Appbar />
            <Container maxWidth="xl" style={{ marginTop: '20px', }}>
                <Grid container spacing={3} style={{ borderRadius: 10, margin: '5%', width: '90%', backgroundColor: 'Gainsboro' }}>
                    <Grid item>
                        <h3 style={{ marginBottom: '50px', textAlign: 'center' }}>CREAR COLA DE PROCESOS</h3>
                        <Box mb={6}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>USUARIOS DE EJECCUCION</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ExecutionUsers />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>SERVIDOR</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Server />
                                </AccordionDetails>
                            </Accordion>
                            <Box mt={1}>
                                <Action />
                            </Box>
                        </Box>
                        <Box mb={1}>
                            <ProcessQueque />
                        </Box>
                        <Box>
                            <TasksQueque />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm container direction="column" justifyContent="flex-start">
                        <Grid item container spacing={2}>
                            <Grid item xs>
                                <Box display="flex" flexDirection="row-reverse">
                                    <h3>PROCESOS GUARDADOS</h3>
                                </Box>
                            </Grid>
                            <Grid item xs={5}>
                                <Box mt={1}>
                                    <SavedProcesses />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box mt={2}>
                                    <Export />
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item >
                            <Box mt={2}>
                                <Divider />
                            </Box>
                            <Box display="flex" justifyContent="center">
                                <h3>RESULTADOS</h3>
                            </Box>
                            <ResultsTable />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
}

export default Home;