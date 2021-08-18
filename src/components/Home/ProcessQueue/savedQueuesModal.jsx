import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Publish from '@material-ui/icons/Publish';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import SavedQueues from './SavedQueues';
import processQContext from '../../../context/processQ/processQContext';

const SavedQueuesModal = () => {

  const processesQContext = useContext(processQContext);

  const [open, setOpen] = useState(false);
  const [ selected, setSelected ] = useState(null);

  const  { getSavedQueues, loadSavedQueue } = processesQContext;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
    getSavedQueues();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    setOpen(false);
    loadSavedQueue(selected);
  };

  return (
    <div>
        <Button
            variant="contained"
            color="primary"
            style={{ width: "100%", fontWeight: "bold" }}
            startIcon={<Publish />}
            onClick={handleClickOpen}
        >
            Cargar
        </Button>
        <Dialog
            fullScreen={fullScreen}
            open={open}
            fullWidth={true}
            maxWidth={'sm'}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{"Cargar Cola Almacenada"}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                <SavedQueues setSelected={setSelected} />
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
                Cancelar
            </Button>
            <Button onClick={handleAccept} color="primary" autoFocus>
                Cargar
            </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}

export default SavedQueuesModal;