import { TextField } from "@mui/material";
import React from "react";
import { Controller, Control } from "react-hook-form";

interface FormTextFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  disabled?: boolean;
  helperText?: string;
  inputProps?: any;
  value?: any; 
  rest?: any;
}
const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  control,
  label,
  disabled=false,
  helperText,
  inputProps,
  value, 
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          value={field.value ?? ""} // Ensure value is controlled
          onChange={(event) => field.onChange(event.target.value)} // Properly handle onChange
          label={label}
          error={!!error?.message}
          helperText={helperText || error?.message}
          variant="outlined"
          disabled={disabled}
          {...rest}
        />
      )}
    />
  );
};

export default FormTextField;
