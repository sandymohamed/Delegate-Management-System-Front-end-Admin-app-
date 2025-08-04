// TODO NOT USED COMPONENT!!!!!

import { Box, Typography } from "@mui/material";
import React from "react";

interface FormBlockProps {
  children: React.ReactNode;
}

const FormBlock: React.FC<FormBlockProps> = ({ children }) => {
  return (
    <Box
      sx={{
        mb: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default FormBlock;
