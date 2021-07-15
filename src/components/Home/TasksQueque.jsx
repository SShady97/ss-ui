import React from "react";

import VisibilityIcon from "@material-ui/icons/Visibility";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const TasksQueque = () => {

    let history = useHistory();

    const handleOption = (option) => {
        history.push(option);
    }

    return (
        <Button
            variant="outlined"
            style={{ width: "100%", backgroundColor: 'White' }}
            startIcon={<VisibilityIcon />}
            onClick={() => handleOption("/tasks")}
        >
            Ver tareas en cola
        </Button>
    );
};

export default TasksQueque;
