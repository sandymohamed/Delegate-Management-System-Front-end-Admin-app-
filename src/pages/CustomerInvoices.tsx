import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Chip,
  Container,
  Divider,
  Grid2,
  IconButton,
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
  Typography,
} from "@mui/material";
import Iconify from "../components/iconify/Iconify";
import { icons } from "../components/iconify/IconRegistry";
import { getAllInvoicesForCustomer } from "../services/invoices.services";
import { TableBodyCell, TableHeadCell, TableHeadRow } from "../components";
import { getCustomerById } from "../services/customers.services";
import { formatDate } from "../utils/dateFormatter";
import { TypeCustomer } from "../types/customers";
import { TypeInvoicesDetails } from "../types/invoice";

const CustomerInvoices: React.FC = () => {
  const { id } = useParams();

  const [totalDataLength, setTotalDataLength] = useState<number>(0);
  const [TableData, setTableData] = useState<
    TypeInvoicesDetails[] | null
  >(null);
  const [customer, setCustomer] = useState<TypeCustomer | null>(null);
  // const [searchTerm, setSearchTerm] = useState(null);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(100);

  useEffect(() => {
    getAllInvoicesForCustomer(Number(id), rowsPerPage, page + 1).then((res) => {
      console.log(res);

      setTableData(res?.data);
      setTotalDataLength(res?.total);
    });

    getCustomerById(Number(id)).then((res) => {
      console.log(res);
      setCustomer(res);
    });

    console.log(customer);
  }, [rowsPerPage, page]);

  return (
    <Container>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" component="h3" gutterBottom>
          تفاصيل العميل : {customer?.name}
        </Typography>

        <Typography>
          <strong> العنوان : </strong>
          {customer?.location}
        </Typography>

        <Typography>
          <strong> اسم المحل : </strong>
          {customer?.customer_store_name}
        </Typography>
        <Typography>
          <strong> الهاتف : </strong>
          {customer?.phone}
        </Typography>
        <Typography>
          <strong> اجمالى الفواتير : </strong>
          <Chip label={customer?.total_unpaid_invoices} color="primary" />
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography gutterBottom>
           
            عدد الفواتير : {totalDataLength}{" "}
          </Typography>
          {/* TODO : add filter by:
          date
          is paid
          is not paid
          client name
          */}
          {/* <TextField
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
          /> */}
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Grid2 container spacing={3}>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableHeadRow>
                  <TableHeadCell>رقم الفاتورة</TableHeadCell>
                  <TableHeadCell>العميل</TableHeadCell>
                  <TableHeadCell>تاريخ انشاء الفاتورة </TableHeadCell>
                  <TableHeadCell>تاريخ الاستحقاق</TableHeadCell>

                  <TableHeadCell>السعر الكلى قبل التخفيض</TableHeadCell>
                  <TableHeadCell>التخفيض</TableHeadCell>

                  <TableHeadCell>السعر بعد التخفيض</TableHeadCell>
                  <TableHeadCell>تم الدفع بالكامل؟</TableHeadCell>
                  <TableHeadCell>اجمالى ما تم دفعه</TableHeadCell>
                  <TableHeadCell>اجمالى ما لم يتم دفعه</TableHeadCell>
                  <TableHeadCell> تسديد مبلغ </TableHeadCell>

                  <TableHeadCell> التفاصيل </TableHeadCell>
                </TableHeadRow>
              </TableHead>
              <TableBody>
                {TableData &&
                  TableData?.length &&
                  TableData?.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableBodyCell>{row.invoice_number}</TableBodyCell>
                      <TableBodyCell>{row.customer_id} </TableBodyCell>
                      <TableBodyCell>
                        {formatDate(row.invoice_date)}{" "}
                      </TableBodyCell>
                      <TableBodyCell>{formatDate(row.due_date)}</TableBodyCell>

                      <TableBodyCell>{row.total_price} ج </TableBodyCell>
                      <TableBodyCell>{row.discount}</TableBodyCell>

                      <TableBodyCell>
                        {row.total_after_discount} ج{" "}
                      </TableBodyCell>
                      <TableBodyCell>
                        {row.is_paid ? (
                          <Chip label="نعم" color="primary" />
                        ) : (
                          <Chip label="لا" color="error" />
                        )}
                      </TableBodyCell>
                      <TableBodyCell>{row.total_paid}</TableBodyCell>
                      <TableBodyCell>{row.total_unpaid}</TableBodyCell>

                      <TableBodyCell>
                        {row.is_paid ? (
                          <Typography variant="caption" component={Link}>
                           
                            اذهب لتسديد مبلغ{" "}
                          </Typography>
                        ) : (
                          <Link
                            component={RouterLink}
                            to={`/create-payment/${row.id}`}
                          >
                           
                            اذهب لتسديد مبلغ{" "}
                          </Link>
                        )}
                      </TableBodyCell>

                      <TableBodyCell>
                        <Link component={RouterLink} to={`/invoice/${row.id}`}>
                         
                          تفاصيل{" "}
                        </Link>
                      </TableBodyCell>
                    </TableRow>
                  ))}
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
               
                عدد الفواتير فى الصفحة : {rowsPerPage || 0}{" "}
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

export default CustomerInvoices;
