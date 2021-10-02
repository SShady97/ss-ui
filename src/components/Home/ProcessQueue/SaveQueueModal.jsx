import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import DialogActions from '@material-ui/core/DialogActions';
import Tooltip from "@material-ui/core/Tooltip";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Save from '@material-ui/icons/Save';
import Schedule from '@material-ui/icons/Schedule';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import processQContext from '../../../context/processQ/processQContext';

const SaveQueueModal = () => {

  const processesQContext = useContext(processQContext);

  const [open, setOpen] = useState(false);
  const [ aliasProcess, setAliasProcess ] = useState('');
  const [ selectedDate, setSelectedDate ] = useState(null);
  const [ alert, setAlert ] = useState(false);

  const  { saveQueue, alias, queue, schedulable, runQueue } = processesQContext;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCloseAlert = (event, reason) => {
    setAlert(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
    if(schedulable){
      setSelectedDate(new Date());
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDate(null);
  };

  const handleAcceptSave = () => {
    if(aliasProcess !== ''){
      saveQueue(aliasProcess);
      setOpen(false);
    }else{
      setAlert(true);
    }
  };

  const handleAcceptSchedule = () => {
    runQueue(selectedDate);
    setOpen(false);
  };
  
  const handleChange = (e) => {

    const alias_process = e.target.value;

    if(alias_process.trim() !== ''){
      setAliasProcess(alias_process);
    }
    
  }

  const handleDateChange = (datetime) => {
    setSelectedDate(datetime);
  }


  return (
    <div>
        <Tooltip title={schedulable ? "Programar Ejecución" : "Guardar Cola"}>
          <span>
            <Button
                variant="contained"
                color="default"
                style={{ width: "100%", fontWeight: "bold" }}
                startIcon={schedulable ? <Schedule /> : <Save />}
                onClick={handleClickOpen}
                disabled={schedulable ? false : (queue.length > 0 && alias === null) ? false : true}
            >
                {schedulable ? "Programar" : "Guardar"}
            </Button>
          </span>
        </Tooltip>
        <Dialog
            fullScreen={fullScreen}
            open={open}
            fullWidth={true}
            maxWidth={'sm'}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{schedulable ? "Programar la Ejecución" : "Guardar Cola"}</DialogTitle>
            <DialogContent>

              {schedulable 
                
                ?

                  <DialogContentText>
                    {/* <Snackbar open={alert} onClose={handleCloseAlert} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                      <Alert onClose={handleCloseAlert} severity='error'>
                        El campo es obligatorio!
                      </Alert>
                    </Snackbar> */}
                     <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DateTimePicker
                        label="Fecha y Hora de Ejecución"
                        inputVariant="outlined"
                        value={selectedDate}
                        disablePast={true}
                        style={{ width: "100%" }}
                        onChange={handleDateChange}
                      />
                    </MuiPickersUtilsProvider>
                  </DialogContentText>

                :
                  <DialogContentText>
                    <Snackbar open={alert} onClose={handleCloseAlert} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                      <Alert onClose={handleCloseAlert} severity='error'>
                        El campo es obligatorio!
                      </Alert>
                    </Snackbar>
                    <FormControl required={true} style={{ width: "100%" }}>
                        <InputLabel htmlFor="my-input">Alias</InputLabel>
                        <Input name="alias" id="my-input" aria-describedby="my-helper-text" onChange={handleChange} />
                        <FormHelperText id="my-helper-text">Asigne un alias para identificar su cola de procesos</FormHelperText>
                    </FormControl>
                  </DialogContentText>
              }
              
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={{ fontWeight: 'bold' }} color="secondary" variant="contained" autoFocus>
                  Cancelar
              </Button>
              <Button onClick={schedulable ? handleAcceptSchedule : handleAcceptSave} style={{ fontWeight: 'bold' }} color="primary" variant="contained" autoFocus>
                  {schedulable ? "Programar" : "Guardar"}
              </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}

export default SaveQueueModal;