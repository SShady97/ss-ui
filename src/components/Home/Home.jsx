import React, { Fragment } from 'react';
import { Grid, Container, Box, Accordion, Typography, makeStyles, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { DesktopWindows, ExpandMore } from '@material-ui/icons';
import Appbar from '../Appbar';
import Server from './Server';

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
            <Container maxWidth="xl" style={{ marginTop: '20px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={3}>
                        <h3 style={{ marginBottom: '50px', textAlign: 'center'}}>CREAR COLA DE PROCESOS</h3>
                        <Box>
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
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
                        <div style={{ textAlign: 'center'}}>
                            <h3>RESULTADOS</h3>
                        </div>
                        
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
     );
}
 
export default Home;