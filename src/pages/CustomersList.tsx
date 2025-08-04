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
import { getAllCustomers } from "../services/customers.services";
import {
  PaymentForm,
  SimpleDialog,
  TableBodyCell,
  TableHeadCell,
  TableHeadRow,
} from "../components";
import { TypeCustomer } from "../types/customers";
// --------------------------------------------------------

const CustomersList: React.FC = () => {
  const [totalDataLength, setTotalDataLength] = useState<number>(0);
  const [TableData, setTableData] = useState<TypeCustomer[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(100);

  // Dialog
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const handleClickOpen = (id: number) => {
    setOpen(true);
    setSelectedId(id);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleReloadPage = () => {
    getAllCustomers(searchTerm, rowsPerPage, page + 1).then((res) => {
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
          العملاء
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography gutterBottom>
              عدد العملاء : {totalDataLength}
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to={`/create-customer`}
            >
              اضافة عميل جديد
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
          children={
            <PaymentForm
              customer_id={selectedId}
              doAfterSubmit={handleReloadPage}
            />
          }
        />
        <Grid2 container spacing={3}>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableHeadRow>
                  <TableHeadCell> اسم العميل</TableHeadCell>
                  <TableHeadCell>اسم المحل</TableHeadCell>
                  <TableHeadCell>الرصيد الحالى </TableHeadCell>
                  <TableHeadCell>رقم الهاتف</TableHeadCell>
                  <TableHeadCell>العنوان </TableHeadCell>
                  <TableHeadCell>التفاصيل </TableHeadCell>
                  <TableHeadCell>الفواتير السابقة </TableHeadCell>
                  <TableHeadCell> تسديد مبلغ</TableHeadCell>
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
                        <TableBodyCell>
                          {row?.customer_store_name}
                        </TableBodyCell>
                        <TableBodyCell>
                          {row?.total_unpaid_invoices} ج
                        </TableBodyCell>
                        <TableBodyCell>
                          <a href={`tel:${row?.phone}`}>
                            <Button variant="text">{row?.phone}</Button>
                          </a>
                        </TableBodyCell>
                        <TableBodyCell>{row?.location}</TableBodyCell>
                        <TableBodyCell>{row?.info}</TableBodyCell>

                        <TableBodyCell>
                          <Button
                            variant="text"
                            component={RouterLink}
                            to={`/customer-invoices/${row?.id}`}
                          >
                            تفاصيل
                          </Button>
                        </TableBodyCell>

                        <TableBodyCell>
                          <Button
                            color="success"
                            variant="text"
                            onClick={() => {
                              handleClickOpen(row?.id);
                            }}
                          >
                            تسديد مبلغ لهذا العميل
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

export default CustomersList;
