import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Paper,
  Grid2,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import Iconify from "../components/iconify/Iconify";
import { icons } from "../components/iconify/IconRegistry";
import { getReturnedProductsList } from "../services/products.services";
import { TableBodyCell, TableHeadCell, TableHeadRow } from "../components";
import { ReturnSearch, TypeProductsReturnedList } from "../types/product";
import { DatePicker } from "@mui/x-date-pickers";
import { formatDate } from "../utils/dateFormatter";
// -------------------------------------------------------

const ReturnedProductsList: React.FC = () => {
  const [totalDataLength, setTotalDataLength] = useState<number>(0);
  const [TableData, setTableData] = useState<TypeProductsReturnedList[] | null>(
    null
  );

  const [tableTheme, setTableTheme] = useState<boolean>(false);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(100);

  const [searchData, setSearchData] = useState<ReturnSearch>({
    start_date: null,
    end_date: null,
    searchTerm: null,
  });

  useEffect(() => {
    getReturnedProductsList(searchData, rowsPerPage, page + 1).then((res) => {
      setTableData(res?.data);
      setTotalDataLength(res?.total);
    });
  }, [searchData, rowsPerPage, page]);

  return (
    <Container>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          المرتجعات:
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography gutterBottom>
              عدد النتجات : {totalDataLength}
            </Typography>
            <Button onClick={() => setTableTheme(!tableTheme)}>
              <Iconify icon={icons.table} width={24} />
            </Button>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField
              id="input-with-icon-textfield"
              label="بحث"
              value={searchData?.searchTerm || ""}
              onChange={(e) =>
                setSearchData((prev) => ({
                  ...prev,
                  searchTerm: e.target.value,
                }))
              }
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon={icons.search} width={24} />
                    </InputAdornment>
                  ),
                },
              }}
              variant="outlined"
            />

            <DatePicker
              label="من التاريخ"
              value={searchData?.start_date}
              onChange={(newValue) => {
                console.log("nnnnnnnn", newValue);
                setSearchData((prev) => ({
                  ...prev,
                  start_date: newValue,
                }));
              }}
            />

            <DatePicker
              label="الي التاريخ"
              value={searchData?.end_date}
              onChange={(newValue) => {
                console.log("nnnnnnnn", newValue);
                setSearchData((prev) => ({
                  ...prev,
                  end_date: newValue,
                }));
              }}
            />
            {(searchData?.searchTerm ||
              searchData?.start_date ||
              searchData?.end_date) && (
              <Button
                variant="outlined"
                color="error"
                onClick={() =>
                  setSearchData({
                    start_date: null,
                    end_date: null,
                    searchTerm: null,
                  })
                }
              >
                <Iconify icon={icons.clean} width={24} />
                مسح البحث
              </Button>
            )}

            <Button
              variant="contained"
              color="secondary"
              component={RouterLink}
              to={`/products/create-product`}
            >
              اضافة منتج جديد
            </Button>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Grid2 container spacing={3}>
          {!tableTheme ? (
            TableData?.map((product) => (
              <Grid2 size={{ xs: 6, sm: 3, md: 2 }} key={product?.id}>
                <Card>
                  <CardContent>
                    <Stack
                      direction="column"
                      spacing={2}
                      alignItems="start"
                      justifyContent="start"
                    >
                      <Typography variant="h6">{product?.name}</Typography>
                      <Typography variant="caption">
                        <Iconify icon={icons.user} /> {product?.agent_name}
                      </Typography>

                      <Typography variant="h6" color="primary">
                        <Iconify icon={icons.price} /> {product?.price} ج
                      </Typography>

                      <Typography variant="caption">
                        <Iconify icon={icons.qrCode} /> {product?.qr_code}
                      </Typography>

                      <Typography variant="caption">
                        <Iconify icon={icons.box} /> {product?.stock_quantity}
                      </Typography>
                      <Typography variant="caption">
                        <Iconify icon={icons.calendar} />
                        {formatDate(product?.return_date || "")}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid2>
            ))
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableHeadRow>
                      <TableHeadCell>اسم المنتج </TableHeadCell>
                      <TableHeadCell>اسم المندوب </TableHeadCell>
                      <TableHeadCell>المرتجع </TableHeadCell>
                      <TableHeadCell> الكمية المرتجعه</TableHeadCell>
                      <TableHeadCell>كود المنتج</TableHeadCell>
                      <TableHeadCell>سبب الاسترجاع</TableHeadCell>

                      <TableHeadCell>
                        <Typography title="تاريخ اقرب كرتونة">
                          تاريخ الاسترجاع
                        </Typography>
                      </TableHeadCell>
                    </TableHeadRow>
                  </TableHead>

                  <TableBody>
                    {TableData?.map((product) => (
                      <TableRow
                        key={product.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableBodyCell>{product.name}</TableBodyCell>
                        <TableBodyCell> {product?.agent_name}</TableBodyCell>
                        <TableBodyCell>{product.return_amount} ج</TableBodyCell>
                        <TableBodyCell>{product.return_quantity}</TableBodyCell>

                        <TableBodyCell>{product.qr_code}</TableBodyCell>
                        <TableBodyCell>{product.reason}</TableBodyCell>
                        <TableBodyCell>{formatDate(product?.return_date || "")}</TableBodyCell>
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
                    عدد الفواتير فى الصفحة : {rowsPerPage || 0}
                  </Typography>
                  <Select
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                  >
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
            </>
          )}
        </Grid2>
      </Box>
      {TableData?.length && !tableTheme && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "bottom",
            mt: 3,
          }}
        >
          <IconButton
            color="secondary"
            aria-label="next"
            size="small"
            onClick={() => setPage(page + 1)}
            disabled={totalDataLength <= (page + 1) * rowsPerPage}
          >
            <Iconify icon={icons.back} width={24} /> التالى
          </IconButton>
        </Box>
      )}
    </Container>
  );
};

export default ReturnedProductsList;
