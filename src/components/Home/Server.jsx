import React, {useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';


const options = [
    {name: 'AutomationEdge'},
    {name: 'OneSource'}
];

const Server = () => {

    const [ servers, setServers ] = useState([]);

    

    useEffect(async () => {
        try {

            const responseProductos = await fetch(`http://localhost:8181/data/servers`);
            const resultProductos = await responseProductos.json();
            
    
            setServers(resultProductos);
    
            
        } catch (error) {
            console.log(error)
        }

    }, [])


    useEffect(() => {
        
        console.log(servers)

    }, [servers])

    const handleChange = (event, newValue) => {
        console.log(newValue);
    }

    return (
        <Autocomplete
            bgcolor={'red'}
            id="servers"
            options={options}
            getOptionLabel={option => option.name}
            onChange={handleChange}
            style={{ width: '100%' }}
            renderInput={params => (
                <TextField {...params} label="Seleccionar Servidor" variant="outlined" fullWidth />
            )}
        />  
     );
}
 
export default Server; 