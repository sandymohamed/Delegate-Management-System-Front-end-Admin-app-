import React, { useEffect, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
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
import { getProductsList } from "../services/products.services";
import { TableBodyCell, TableHeadCell, TableHeadRow } from "../components";
import { TypeProductsList } from "../types/product";
// -------------------------------------------------------

const ProductsList: React.FC = () => {
  const [totalDataLength, setTotalDataLength] = useState<number>(0);
  const [TableData, setTableData] = useState<TypeProductsList[] | null>(null);

  const [tableTheme, setTableTheme] = useState<boolean>(false);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(100);

  const [searchTerm, setSearchTerm] = useState<string | null | undefined>(null);

  useEffect(() => {
    getProductsList(searchTerm, rowsPerPage, page + 1).then((res) => {
      console.log(res);

      setTableData(res?.data);
      setTotalDataLength(res?.total);
    });
  }, [searchTerm, rowsPerPage, page]);

  return (
    <Container>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          المنتجات:
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography gutterBottom>
             
              عدد النتجات : {totalDataLength}{" "}
            </Typography>
            <Button onClick={() => setTableTheme(!tableTheme)}>
             
              <Iconify icon={icons.table} width={24} />{" "}
            </Button>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField
              id="input-with-icon-textfield"
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
              variant="outlined"
            />
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

                      <Typography variant="h6" color="primary">
                        <Iconify icon={icons.price} /> {product?.price} ج
                      </Typography>

                      <Typography variant="caption">
                        <Iconify icon={icons.qrCode} /> {product?.qr_code}
                      </Typography>

                      <Typography variant="caption">
                        <Iconify icon={icons.box} /> {product?.stock_quantity}
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
                      <TableHeadCell>سعر الكرتونة</TableHeadCell>
                      <TableHeadCell> الكمية المتوفرة</TableHeadCell>
                      <TableHeadCell>كود المنتج</TableHeadCell>
                      <TableHeadCell>
                        <Typography title="تاريخ اقرب كرتونة">
                          تاريخ انتهاء الصلاحية
                        </Typography>
                      </TableHeadCell>
                      <TableHeadCell>تفاصيل </TableHeadCell>
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
                        <TableBodyCell>{product.price} ج </TableBodyCell>
                        <TableBodyCell>{product.stock_quantity}</TableBodyCell>

                        <TableBodyCell>{product.qr_code}</TableBodyCell>
                        <TableBodyCell>{product.description}</TableBodyCell>
                        <TableBodyCell>{product.exp_date}</TableBodyCell>
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

export default ProductsList;
