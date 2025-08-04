// import { Box, TextField } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers";
// import React from "react";
// import { Control, Controller } from "react-hook-form";

// interface FormDatePickerProps {
//   name: string;
//   control: Control;
//   label: string;
//   rest?: any;
// }

// const FormDatePicker: React.FC<FormDatePickerProps> = ({
//   name,
//   control,
//   label,
//   ...rest
// }) => {
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <DatePicker
//           {...rest}
//           {...field}
//           inputFormat="dd/MM/yyyy"
//           label={label}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               error={!!error?.message}
//               helperText={error?.message}
//               slotProps={{ inputLabel: { shrink: true } }}
//             />
//           )}
//         />
//       )}
//     />
//   );
// };

// export default FormDatePicker;

import { Box, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { Controller } from "react-hook-form";

interface FormDatePickerProps {
  name: string;
  control: any;
  label: string;
  rest?: any;
}

const FormDatePicker: React.FC<FormDatePickerProps> = ({
  name,
  control,
  label,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box sx={{ flexDirection: "column" }}>
          <DatePicker
            {...rest}
            {...field}
            format="dd/MM/yyyy"
            label={label}
            sx={{ width: "100%" }}
          />
          {error && (
            <Typography variant="caption" color="error">
              {error?.message}
            </Typography>
          )}
        </Box>
      )}
    />
  );
};
// return (
//   <Controller
//     name={name}
//     control={control}
//     render={({ field, fieldState: { error } }) => (
//       <DatePicker
//         {...rest}
//         {...field}
//         format="DD/MM/YYYY" // Corrected from `inputFormat` (MUI v6+)
//         value={field.value} // Ensure correct date format
//         onChange={(date) => field.onChange(date)} // Ensure proper event handling
//         slotProps={{
//           textField: {
//             error: !!error,
//             helperText: (error as FieldError)?.message, // Ensure correct type for error messages
//           },
//         }}
//       />
//     )}
//   />
// );
// };

export default FormDatePicker;
