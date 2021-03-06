import React , { useContext } from "react";

import { Button, useMediaQuery, Popover, Box } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
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
    const { alert, alertmsg, alertstatus, setAlert, queueA, getAllQueues, deleteQueue } = processQsContext;

    let title = null;
    let queue_id = null;
    if ( queueA[0] ) {
        title = queueA[0].alias;
        queue_id = queueA[0].queue_id;
    }

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [openAlert, setOpenAlert] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const popoverOpen = Boolean(anchorEl);
    const deletePopover = popoverOpen ? 'delete-popconfirm' : undefined;

    const handleClose = () => {
        toogle();
    };

    const handleDelete = () => {
        deleteQueue(queue_id);
        getAllQueues();
        handleCancel();
        handleClose();
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCancel = () => {
        setAnchorEl(null);
    };

    const handleAlertClose = (event, reason) => {
        setOpenAlert(false);
        setAlert(false);
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
            label:'Acci??n',
        },
        {
            name: 'parameter',
            label:'Parametro',
        },
        {
            name: 'validation',
            label:'Validaci??n',
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
                            ??Est?? seguro?
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
        <div>
            <Snackbar 
                open={alert} 
                autoHideDuration={4000} 
                onClose={handleAlertClose}
                anchorOrigin={{
                    vertical: 'left',
                    horizontal: 'top'
                }}
            >
                <Alert variant="filled" onClose={handleAlertClose} severity={alertstatus === 200 ? 'success' : 'warning'}>
                    {alertmsg}
                </Alert>
            </Snackbar>
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
        </div>
    );
};

export default QueueModal;