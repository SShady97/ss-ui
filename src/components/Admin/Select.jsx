import React from "react";
import { TextField, MenuItem, withStyles } from "@material-ui/core";

const SelectTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#517461',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#517461',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#517461',
            },
            '&:hover fieldset': {
                borderColor: '#517461',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#517461',
            },
        },
    },
})(TextField);

const Select = ({ options, onChange, value }) => {

    const handleChange = (event) => {
        const text = event.target.value;
        onChange(text);
    };

    return (
        <SelectTextField
            id="standard-select-option"
            select
            label="Tabla"
            value={value}
            onChange={handleChange}
            fullWidth
            variant="outlined"
        >
            {options.map((option) => (
                <MenuItem key={option.name} value={option.name}>
                    {option.name}
                </MenuItem>
            ))}
        </SelectTextField>
    );
};

export default Select;
