import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import CodeIcon from '@material-ui/icons/Code';

import ActionsTable from './ActionsTable';

const ActionsModal = () => {

  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        style={{ width: '100%', fontWeight: 'bold'}}
        startIcon={<CodeIcon />} onClick={handleClickOpen}
      >
        VER ACCIONES DISPONIBLES
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        maxWidth={'md'}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Acciones Disponibles"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <ActionsTable />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ fontWeight: 'bold' }} color="secondary" variant='contained' autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ActionsModal;