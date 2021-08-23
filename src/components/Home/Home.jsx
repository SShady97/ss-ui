import React, { Fragment, useEffect, useContext, useState } from 'react';

import { Grid, Container, Box, Accordion, Typography, makeStyles, AccordionSummary, AccordionDetails, Divider } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import Appbar from '../Appbar';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import ActionsModal from './Actions/ActionsModal';
import ProcessesTable from './ProcessQueue/ProcessesTable';
import ResultsTable from './ResultsTable';

import serverContext from '../../context/servers/serverContext';
import scriptContext from '../../context/scripts/scriptContext';
import processQContext from '../../context/processQ/processQContext';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 'bold',
    },
    background: {
        borderRadius: 10,
        margin: '5%',
        width: '90%',
        backgroundColor: theme.palette.action.disabled,
    }
}));

const Home = () => {

    const classes = useStyles();

    const [openAlert, setOpenAlert] = useState(false);


    const serversContext = useContext(serverContext);
    const scriptsContext = useContext(scriptContext);
    const processesQContext = useContext(processQContext);

    const { getServers } = serversContext;
    const { getScripts } = scriptsContext;
    const  { alertmsg, alertstatus, alert, setAlert } = processesQContext;


    
    const handleClose = (event, reason) => {
        setOpenAlert(false);
        setAlert(false);
      };

    useEffect(() => {
        getServers();
        getScripts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <Fragment>
            <Appbar />
            <Container maxWidth="xl" style={{ marginTop: '20px'}}>
                <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alertstatus === 200 ? 'success' : 'warning'}>
                        {alertmsg}
                    </Alert>
                </Snackbar>
                <Grid container spacing={3} className={classes.background}>
                    <Grid item xs={12}>
                        <h3 style={{ marginBottom: '50px', textAlign: 'center' }}>CREAR COLA DE PROCESOS</h3>
                        <Box mb={6}>
                            <Box mt={1}>
                                <ActionsModal />
                            </Box>
                        </Box>
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