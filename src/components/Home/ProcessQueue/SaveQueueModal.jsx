import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Save from '@material-ui/icons/Save';

import processQContext from '../../../context/processQ/processQContext';

const SaveQueueModal = () => {

  const processesQContext = useContext(processQContext);

  const [open, setOpen] = useState(false);

  const  { saveQueue } = processesQContext;

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
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const alias = e.target.alias.value;
    saveQueue(alias);
    setOpen(false);
  }

  return (
    <div>
        <Button
            variant="contained"
            color="default"
            style={{ width: "100%", fontWeight: "bold" }}
            startIcon={<Save />}
            onClick={handleClickOpen}
        >
            Guardar
        </Button>
        <Dialog
            fullScreen={fullScreen}
            open={open}
            fullWidth={true}
            maxWidth={'sm'}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{"Guardar Cola"}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                <form onSubmit={handleSubmit}>
                    <FormControl required={true} style={{ width: "100%" }}>
                        <InputLabel htmlFor="my-input">Alias</InputLabel>
                        <Input name="alias" id="my-input" aria-describedby="my-helper-text" />
                        <FormHelperText id="my-helper-text">Asigne un alias para identificar su cola de procesos</FormHelperText>
                        <Button
                            variant="contained"
                            type="submit"
                            color="default"
                            style={{ width: "100%", fontWeight: "bold", marginTop: "10px" }}
                            startIcon={<Save />}
                        >
                            Guardar
                        </Button>
                    </FormControl>
                </form>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
                Cancelar
            </Button>
            <Button onClick={handleAccept} color="primary" autoFocus>
                Guardar
            </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}

export default SaveQueueModal;