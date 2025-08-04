import React, { useEffect } from "react";
import { Control, Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

interface FormAutoCompleteProps {
  name: string;
  control: Control<any>;
  label: string;
  options: any[];
  getOptionLabel?: (option: any) => string;
  isOptionEqualToValue?: (option: any, value: any) => boolean;
  onChange?: (e: any, value: any) => void;
  rest?: any;
}

const FormAutoComplete: React.FC<FormAutoCompleteProps> = ({
  name,
  control,
  label,
  options,
  getOptionLabel,
  isOptionEqualToValue,
  onChange,
  ...rest
}) => {

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          value={field.value || null} // Ensure value is controlled
          options={options}
          getOptionLabel={getOptionLabel}
          isOptionEqualToValue={isOptionEqualToValue}
          onChange={(_, value) => field.onChange(value)} // Properly handle onChange
          renderInput={(params) => (
            <div dir="rtl">
              <TextField
                {...params}
                label={label}
                error={!!error?.message}
                helperText={error?.message}
              />
            </div>
          )}
          {...rest}
        />
      )}
    />
  );
};

export default FormAutoComplete;
