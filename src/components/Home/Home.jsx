import React, { Fragment, useEffect, useContext } from 'react';

import { Grid, Container, Box, Accordion, Typography, makeStyles, AccordionSummary, AccordionDetails, Divider } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import Appbar from '../Appbar';
import Export from './Export';
import ActionsModal from './Actions/ActionsModal';
import ProcessesModal from './ProcessQueue/ProcessesModal';
import ProcessesTable from './ProcessQueue/ProcessesTable';
import TasksQueque from './TasksQueque';
import ResultsTable from './ResultsTable';

import serverContext from '../../context/servers/serverContext';
import scriptContext from '../../context/scripts/scriptContext';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 'bold',
    },
}));

const Home = () => {

    const classes = useStyles();

    const serversContext = useContext(serverContext);
    const scriptsContext = useContext(scriptContext);

    const  { getServers } = serversContext;
    const { getScripts } = scriptsContext;

    useEffect(() => {
        getServers();
        getScripts();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <Fragment>
            <Appbar />
            <Container maxWidth="xl" style={{ marginTop: '20px', }}>
                <Grid container spacing={3} style={{ borderRadius: 10, margin: '1%', width: '98%', backgroundColor: 'Gainsboro' }}>
                    <Grid item xs={12}>
                        <h3 style={{ marginBottom: '50px', textAlign: 'center' }}>CREAR COLA DE PROCESOS</h3>
                        <Box mb={6}>                 
                            <Box mt={1}>
                                <ActionsModal />
                            </Box>
                        </Box>
                        {/* <Box mb={1}>
                            <ProcessQueque />
                        </Box>
                        <Box>
                            <TasksQueque />
                        </Box> */}
                        <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>COLA DE PROCESOS</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ProcessesTable />
                                </AccordionDetails>
                            </Accordion> 
                    </Grid>

                    <Grid item xs={12} sm container direction="column" justifyContent="flex-start">
                        {/* <Grid item container spacing={2}>
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
                        </Grid> */}
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