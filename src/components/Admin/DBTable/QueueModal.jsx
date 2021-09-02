import React , { useContext } from "react";

import { Button, useMediaQuery, Popover, Box } from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import { Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { withStyles, useTheme } from "@material-ui/core/styles";

import processQContext from '../../../context/processQ/processQContext';

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#517461'),
        backgroundColor: '#517461',
        '&:hover': {
            backgroundColor: '#517461',
        },
    },
}))(Button);

const QueueModal = ({ open, toogle }) => {

    const processQsContext = useContext(processQContext);
    const { queueA, getAllQueues, deleteQueue } = processQsContext;

    let title = null;
    let queue_id = null;
    if ( queueA[0] ) {
        title = queueA[0].alias;
        queue_id = queueA[0].queue_id;
    }

    console.log("jio");
    console.log(queueA);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [anchorEl, setAnchorEl] = React.useState(null);
    const popoverOpen = Boolean(anchorEl);
    const deletePopover = popoverOpen ? 'delete-popconfirm' : undefined;

    const handleClose = () => {
        toogle();
    };

    const handleDelete = () => {
        deleteQueue(queue_id);
        getAllQueues();
        handleClose();
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCancel = () => {
        setAnchorEl(null);
    };

    const columns = [
        {
            name: 'server_app',
            label:'Servidor',
        },
        {
            name: 'server_env',
            label:'Entorno',
        },
        {
            name: 'exec_user',
            label:'Usuario',
        },
        {
            name: 'script',
            label:'Acción',
        },
        {
            name: 'parameter',
            label:'Parametro',
        },
        {
            name: 'validation',
            label:'Validación',
        }
    ];

    const options = {
        download: 'false',
        print: 'false',
        filter: 'false',
        selectableRows: 'none',
        viewColumns: 'false'
    };
    
    const body = (
        <div>
            <DialogContent>
                <DialogContentText>
                    < MUIDataTable
                        title={title}
                        data={queueA}
                        columns={columns}
                        options={options}
                    />      
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus aria-describedby={deletePopover} onClick={handleClick} color="secondary">
                    Eliminar
                </Button>
                <Popover 
                id={deletePopover}
                open={popoverOpen}
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
                <ColorButton onClick={handleClose} autoFocus>
                    Cerrar
                </ColorButton>
            </DialogActions>
        </div>

    );

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen={fullScreen}
            aria-labelledby="responsive-dialog-title"
            fullWidth
            maxWidth="md"
        >
            {body}
        </Dialog>
    );
};

export default QueueModal;