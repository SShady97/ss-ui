import React from "react";

import VisibilityIcon from "@material-ui/icons/Visibility";
import { Button, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    boton: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
}));

const TasksQueque = () => {

    let history = useHistory();
    const classes = useStyles();

    const handleOption = (option) => {
        history.push(option);
    }

    return (
        <Button
            variant="outlined"
            className={classes.boton}
            startIcon={<VisibilityIcon />}
            onClick={() => handleOption("/tasks")}
        >
            Ver tareas en cola
        </Button>
    );
};

export default TasksQueque;
