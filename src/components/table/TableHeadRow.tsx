import React from 'react'
import { TableRow } from '@mui/material'

interface TableHeadRowProps {
    children: React.ReactNode
  }
const TableHeadRow: React.FC<TableHeadRowProps> =({ children }) => {
    return (
        <TableRow sx={{ backgroundColor: (theme) => `${theme.palette.secondary.main} !important`, }}>
            {children}
        </TableRow>
    )
}

export default TableHeadRow