import React from "react";

import { Button, Popover, Box } from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';

const DeleteButton = ({ handleClose, deleteFunction, getFunction, id }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleDelete = () => {
        deleteFunction(id);
        getFunction();
        handleCancel();
        handleClose();
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCancel = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const deletePopover = open ? 'delete-popconfirm' : undefined;

    return (
        <div>
            <Button autoFocus aria-describedby={deletePopover} onClick={handleClick} color="secondary">
                Eliminar
            </Button>
            <Popover 
            id={deletePopover}
            open={open}
            anchorEl={anchorEl}
            onClose={handleCancel}
            anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
            }}
            transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
            }}
            >
                <Box fullWidth display="flex" pt={1} justifyContent="center" alignItems="center">
                    <ErrorIcon/>
                    <Box ml={1}>
                        ¿Está seguro?
                    </Box>
                </Box>
                <Button autoFocus onClick={handleCancel} color="disabled">
                    Cancelar
                </Button>
                <Button autoFocus onClick={handleDelete} color="primary">
                    Confirmar
                </Button>
            </Popover>
      </div>
    );
};

export default DeleteButton;