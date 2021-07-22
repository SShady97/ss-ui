import React, { Fragment } from 'react';

import { Container, makeStyles } from '@material-ui/core';

import Appbar from '../Appbar';
import TasksTable from './TasksTable';

const useStyles = makeStyles((theme) => ({
    '@global': {
        body: {
            backgroundColor: "Gainsboro"
        }
    },

}));

const Tasks = () => {

    useStyles();

    return (

        <Fragment>
            <Appbar />
            <Container maxWidth="xl" style={{ marginTop: '20px' }}>
                <TasksTable />
            </Container>
        </Fragment>

    );
}

export default Tasks;