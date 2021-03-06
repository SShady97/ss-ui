import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Tooltip from "@material-ui/core/Tooltip";
import DialogTitle from '@material-ui/core/DialogTitle';
import Publish from '@material-ui/icons/Publish';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import LoadQueue from './LoadQueue';
import processQContext from '../../../context/processQ/processQContext';

const LoadQueueModal = () => {

  const processesQContext = useContext(processQContext);

  const [open, setOpen] = useState(false);
  const [ selected, setSelected ] = useState(null);

  const  { getSavedQueues, loadSavedQueue, setLoading } = processesQContext;

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
    setLoading('queue');
    setOpen(false);
    loadSavedQueue(selected);
  };

  return (
    <div>
        
        <Tooltip title={"Cargar Cola Guardada"}>
          <Button
              variant="contained"
              style={{ width: "100%", fontWeight: "bold" }}
              startIcon={<Publish />}
              onClick={handleClickOpen}
          >
              Cargar
          </Button>
        </Tooltip>
        <Dialog
            fullScreen={fullScreen}
            open={open}
            fullWidth={true}
            maxWidth={'sm'}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">Cargar Cola Almacenada</DialogTitle>
            <DialogContent>
            <DialogContentText>
                <LoadQueue setSelected={setSelected} />
            </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={{ fontWeight: 'bold' }} color="secondary" variant='contained' autoFocus>
                Cancelar
              </Button>
              <Button disabled={selected === null ? true : false} onClick={handleAccept} style={{ fontWeight: 'bold' }} color="primary" variant='contained' autoFocus>
                Cargar
              </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}

export default LoadQueueModal;