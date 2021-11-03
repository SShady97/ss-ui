import React, { Fragment, useEffect, useContext, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid, Container, Box, Accordion, Typography, makeStyles, AccordionSummary, AccordionDetails, Divider } from '@material-ui/core';
import { ExpandMore, Schedule, ViewList } from '@material-ui/icons';
import Appbar from '../Appbar';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import ActionsModal from './Actions/ActionsModal';
import ResultsTable from './ResultsTable/ResultsTable';
import ScheduledTable from './ScheduledTable';

import ProcessesDataTable from './ProcessQueue/ProcessesDataTable';

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
    const  { alertmsg, alertstatus, alert, setAlert, loading, getScheduledExec } = processesQContext;


    
    const handleClose = (event, reason) => {
        setOpenAlert(false);
        setAlert(false);
      };

    useEffect(() => {
        getServers();
        getScripts();
        getScheduledExec();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <Fragment>
            <Appbar />
            <Container maxWidth="xl" style={{ marginTop: '20px'}}>
                <Snackbar open={alert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} onClose={handleClose}>
                    <Alert variant='filled' onClose={handleClose} severity={alertstatus === 200 ? 'success' : 'warning'}>
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
                        <Box mb={2}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >   
                                    <Schedule style={{marginRight: '10px'}}/>
                                    <Typography className={classes.heading}>EJECUCIONES PROGRAMADAS</Typography>
                                </AccordionSummary>
                                <AccordionDetails style={{display: "flex", justifyContent: "center"}}>
                                    <ScheduledTable />
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <ViewList style={{marginRight: '10px'}}/>
                                <Typography className={classes.heading}>COLA DE PROCESOS</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{display: "flex", justifyContent: "center"}}>
                                {loading === 'queue'
                                    ?
                                        <div style={{ margin: "50px" }}>
                                            <CircularProgress />
                                        </div>
                                    :
                                        <ProcessesDataTable />
                                }
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item sm xs={12} direction="column">
                            <Box mt={2}>
                                <Divider />
                            </Box>
                            <Box display="flex" justifyContent="center">
                                <h3>RESULTADOS</h3>
                            </Box>
                            {loading === 'results'

                                ?
                                    <div style={{display: "flex", justifyContent: "center", margin: "50px"}}>
                                        <CircularProgress />
                                    </div>
                                :
                                    <ResultsTable />
                            }
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
}

export default Home;