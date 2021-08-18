import React, { Fragment } from 'react';

import { Container } from '@material-ui/core';

import Appbar from '../Appbar';
import TasksTable from './TasksTable';


const Tasks = () => {

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