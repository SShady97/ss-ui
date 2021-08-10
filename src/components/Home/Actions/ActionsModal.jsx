import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CodeIcon from '@material-ui/icons/Code';

import ActionsTable from './ActionsTable';

import scriptContext from '../../../context/scripts/scriptContext';


const ActionsModal = () => {

  const [ actions, setActions ] = useState([]);
  const [open, setOpen] = useState(false);

  const scriptsContext = useContext(scriptContext);

  const { scripts, selectScripts } = scriptsContext;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    setOpen(false);
    
    let selected_scripts = actions.map( action => (scripts[action]));
    selectScripts(selected_scripts);
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ width: "100%", backgroundColor:'White'}}
        startIcon={<CodeIcon />} onClick={handleClickOpen}
      >
        Acciones
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        maxWidth={'md'}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Acciones a Ejecutar"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <ActionsTable setActions={setActions} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancelar
          </Button>
          <Button onClick={handleAccept} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ActionsModal;