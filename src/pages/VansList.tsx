import React, { useEffect, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid2,
  IconButton,
  InputAdornment,
  Link,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Iconify from "../components/iconify/Iconify";
import { icons } from "../components/iconify/IconRegistry";
import { getAllVans } from "../services/vans.services";
import {
  PaymentForm,
  SimpleDialog,
  TableBodyCell,
  TableHeadCell,
  TableHeadRow,
} from "../components";
import { Van } from "../types/Van";
import { formatDate } from "../utils/dateFormatter";
import CreateVan from "./CreateVan";
// --------------------------------------------------------

const VansList: React.FC = () => {
  const [totalDataLength, setTotalDataLength] = useState<number>(0);
  const [TableData, setTableData] = useState<Van[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(100);

  // Dialog
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Van | null>(null);
  const handleClickOpen = (row: Van) => {
    setOpen(true);
    setSelectedRow(row);
  };
  const handleClose = () => {
    setOpen(false);
    handleReloadPage();
  };

  const handleReloadPage = () => {
    // getAllVans(searchTerm, rowsPerPage, page + 1).then((res) => {

    getAllVans(searchTerm, rowsPerPage, page + 1).then((res) => {
      console.log(res);

      setTableData(res?.data);
      setTotalDataLength(res?.total);
    });
  };

  useEffect(() => {
    handleReloadPage();
  }, [searchTerm, rowsPerPage, page]);

  return (
    <Container>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          الشاحنات
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography gutterBottom>
              عدد الشاحنات : {totalDataLength}
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to={`/vans/create-van`}
            >
              اضافة شاحنة جديدة
            </Button>
          </Box>
          {/* TODO : add filter by:
          client name
          has not paid invoices
          has total unpaid amount like more than 10000 or less than 1000000
          client location

          */}
          <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            label="بحث"
            onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon={icons.search} width={24} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Stack>

        <Divider sx={{ my: 3 }} />
        <SimpleDialog
          open={open}
          onClose={handleClose}
          children={<CreateVan handleAfterSubmit={handleClose} isEdit editData={selectedRow} />}
        />
        <Grid2 container spacing={3}>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableHeadRow>
                  <TableHeadCell> الموديل </TableHeadCell>
                  <TableHeadCell> رقم الشاحنة </TableHeadCell>
                  <TableHeadCell>تاريخ الاضافة </TableHeadCell>
                  <TableHeadCell> المندوب </TableHeadCell>

                  <TableHeadCell>التفاصيل </TableHeadCell>
                  <TableHeadCell>تعديل </TableHeadCell>
                </TableHeadRow>
              </TableHead>
              <TableBody>
                {TableData && TableData?.length
                  ? TableData?.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableBodyCell>{row?.name}</TableBodyCell>
                        <TableBodyCell>{row?.plate_number}</TableBodyCell>
                        <TableBodyCell>
                          {formatDate(row?.created_at || "")}
                        </TableBodyCell>
                        {/* TODO : update this link to go to this user details */}
                        <TableBodyCell>
                          <Button
                            variant="text"
                            component={RouterLink}
                            to={`/customer-invoices/${row?.agent_id}`}
                          >
                            {row?.agent_name}
                          </Button>
                        </TableBodyCell>

                        <TableBodyCell>
                          <Button
                            variant="text"
                            component={RouterLink}
                            to={`/vans/van/${row?.id}`}
                          >
                            تفاصيل
                          </Button>
                        </TableBodyCell>

                        <TableBodyCell>
                          <Button
                            color="success"
                            variant="text"
                            onClick={() => {
                              handleClickOpen(row);
                            }}
                          >
                            تغيير المندوب
                          </Button>
                        </TableBodyCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider sx={{ my: 3 }} />
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              {/* dropdown for page size */}
              <Typography gutterBottom>
                عدد الفواتير فى الصفحة : {rowsPerPage || 0}
              </Typography>
              <Select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
              >
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={500}>500</MenuItem>
                <MenuItem value={1000}>1000</MenuItem>
              </Select>
            </Stack>

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <IconButton
                color="secondary"
                aria-label="back"
                size="small"
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
              >
                <Iconify icon={icons.next} width={24} />
              </IconButton>

              <Typography gutterBottom> الصفحة : {page + 1} </Typography>

              <IconButton
                color="secondary"
                aria-label="next"
                size="small"
                onClick={() => setPage(page + 1)}
                disabled={totalDataLength <= (page + 1) * rowsPerPage}
              >
                <Iconify icon={icons.back} width={24} />
              </IconButton>
            </Stack>
          </Stack>
        </Grid2>
      </Paper>
    </Container>
  );
};

export default VansList;
