import React from "react";
import { TableCell } from "@mui/material";

interface TableHeadCellProps {
  children: React.ReactNode;
}

const TableHeadCell: React.FC<TableHeadCellProps> = ({ children }) => {
  return (
    <TableCell
      sx={{
        fontWeight: "bold",
        backgroundColor: (theme) => `${theme.palette.secondary.main} `,
        // color: (theme) => `${theme.palette.text.light} `,}}>
        color: "#fff",
      }}
    >
      {children}
    </TableCell>
  );
};

export default TableHeadCell;
