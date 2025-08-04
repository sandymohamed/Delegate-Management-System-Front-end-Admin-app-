import { TableCell } from '@mui/material'
import React from 'react'

interface TableBodyCellProps {
  children: React.ReactNode
}
const TableBodyCell: React.FC<TableBodyCellProps> = ({ children }) => {
  return (
    <TableCell sx={{ whiteSpace: 'nowrap' }}>
      {children}
    </TableCell>
  )
}

export default TableBodyCell