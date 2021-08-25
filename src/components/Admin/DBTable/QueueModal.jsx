import React , { useContext } from "react";

import { Button, useMediaQuery } from "@material-ui/core";
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
    const { queueA } = processQsContext;

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
            label:'Usuaruio',
        },
        {
            name: 'script',
            label:'DAccion',
        },
        {
            name: 'parameter',
            label:'Parametro',
        },
        {
            name: 'validation',
            label:'Validacion',
        }
    ];

    let title = null;
    if ( queueA[0] ) {
        title = queueA[0].alias;
    }

    // const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        toogle();
    };

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
                <Button autoFocus onClick={handleClose} color="secondary">
                    Eliminar
                </Button>
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