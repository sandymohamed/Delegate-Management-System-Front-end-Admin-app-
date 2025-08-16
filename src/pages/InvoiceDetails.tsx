import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  Grid2,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Iconify from "../components/iconify/Iconify";
import { getInvoiceById } from "../services/invoices.services";
import { formatDate } from "../utils/dateFormatter";
import {
  SimpleDialog,
  TableBodyCell,
  TableHeadCell,
  TableHeadRow,
  QuickPaymentForm,
  PaymentHistory,
} from "../components";
import {
  TypeInvoiceDetails,
  TypeInvoiceProductsDetails,
} from "../types/invoice";
import AddReturnForm from "../components/AddReturnForm";

// ----------------------------------------------------------------------

const InvoiceDetails: React.FC = () => {
  const [invoiceDetails, setInvoiceDetails] =
    useState<TypeInvoiceDetails | null>(null);
  const [invoiceProductsDetails, setInvoiceProductsDetails] = useState<
    TypeInvoiceProductsDetails[] | null
  >(null);
  const { id } = useParams();

  // Dialog
  const [open, setOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const handlePaymentDialogOpen = () => {
    setPaymentDialogOpen(true);
  };
  
  const handlePaymentDialogClose = () => {
    setPaymentDialogOpen(false);
    handleReloadPage();
  };

  const handleReloadPage = () => {
    getInvoiceById(Number(id)).then((res) => {
      setInvoiceDetails(res);
      setInvoiceProductsDetails(res?.products);
    });
  };

  useEffect(() => {
    handleReloadPage();
  }, [id]);

  return (
    <Container>
      <Card sx={{ p: 2, mt: 4 }}>
        <CardHeader
          title={`رقم الفاتورة ${invoiceDetails?.invoice_number}`}
          subheader={`تاريخ الانشاء ${formatDate(
            invoiceDetails?.invoice_date || ""
          )}`}
          action={
            // TODO: add print button functionality
            <>
              <Button
                variant="outlined"
                startIcon={<Iconify icon="mdi:printer" />}
              >
                طباعة الفاتورة
              </Button>
              <Button
                component={RouterLink}
                to={`/create-payment/${id}`}
                variant="outlined"
                color="success"
                startIcon={<Iconify icon="tdesign:money" />}
              >
                تسديد مبلغ
              </Button>
              <Button
                onClick={handlePaymentDialogOpen}
                variant="contained"
                color="success"
                startIcon={<Iconify icon="eva:flash-fill" />}
              >
                دفع سريع
              </Button>
              <Button
                onClick={handleClickOpen}
                variant="outlined"
                color="secondary"
                startIcon={<Iconify icon="mdi:cart-arrow-up" />}
              >
                تسجيل مرتجع
              </Button>
            </>
          }
        />

        <Stack direction="column" spacing={3} sx={{ my: 2 }}>
          <Typography variant="body1">
            <strong>اسم العميل:</strong> {invoiceDetails?.customer_name}
          </Typography>
          <Typography variant="body1">
            <strong>العنوان:</strong> {invoiceDetails?.customer_location}
          </Typography>
          <Typography variant="body1">
            <strong>تاريخ استحقاق الفاتورة:</strong>
            {formatDate(invoiceDetails?.due_date || "")}
          </Typography>
        </Stack>

        <SimpleDialog
          open={open}
          onClose={handleClose}
          children={
            <AddReturnForm
              invoice={invoiceDetails}
              invoice_id={invoiceDetails?.invoice_id || 0}
              doAfterSubmit={handleReloadPage}
            />
          }
        />
        
        <SimpleDialog
          open={paymentDialogOpen}
          onClose={handlePaymentDialogClose}
          title="دفع سريع"
        >
          {invoiceDetails && (
            <QuickPaymentForm
              invoice={invoiceDetails}
              onPaymentSuccess={handlePaymentDialogClose}
            />
          )}
        </SimpleDialog>
        
        <Divider sx={{ my: 3 }} />

        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableHeadRow>
                <TableHeadCell>اسم المنتج</TableHeadCell>
                <TableHeadCell>الكمية</TableHeadCell>
                <TableHeadCell>السعر</TableHeadCell>
                <TableHeadCell>الاجمالى</TableHeadCell>
              </TableHeadRow>
            </TableHead>
            <TableBody>
              {invoiceProductsDetails?.map(
                (product: TypeInvoiceProductsDetails) => (
                  <TableRow key={product.product_id} hover>
                    <TableBodyCell>
                      <Link
                        component={RouterLink}
                        to={`#`}
                      >
                        {product.product_name}
                      </Link>
                    </TableBodyCell>
                    <TableBodyCell>{product.quantity}</TableBodyCell>
                    <TableBodyCell>{product.price} ج</TableBodyCell>
                    <TableBodyCell>
                      {product.product_total_price} ج
                    </TableBodyCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid2 container spacing={3} sx={{ mt: 2 }}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                تفاصيل الدفع
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body1">
                  <strong>السعر الكلى قبل التخفيض:</strong>
                  {invoiceDetails?.total_price} ج
                </Typography>
                <Typography variant="body1">
                  <strong>التخفيض:</strong> {invoiceDetails?.discount} ج
                </Typography>
                <Typography variant="body1">
                  <strong>الاجمالى:</strong>
                  {invoiceDetails?.total_after_discount} ج
                </Typography>
                <Typography variant="body1">
                  <strong>تم الدفع بالكامل:</strong>
                  {invoiceDetails?.is_paid ? "نعم" : "لا"}
                </Typography>

                <Typography variant="body1">
                  <strong>يوجد مرتجع؟ </strong>
                  {invoiceDetails?.returns ? "نعم" : "لا"}
                </Typography>
                {invoiceDetails?.returns &&
                  invoiceDetails?.returns.length &&
                  invoiceDetails?.returned_amount && (
                    <>
                      <Typography variant="body1">
                        <strong> قيمة المرتجع:</strong>
                        {invoiceDetails?.returned_amount}
                      </Typography>

                      <Typography variant="body1">
                        <strong> اجمالى بعد خصم المرتجع :</strong>
                        {Number(invoiceDetails?.total_after_discount) -
                          Number(invoiceDetails?.returned_amount)}
                      </Typography>
                    </>
                  )}
                <Typography variant="body1">
                  <strong>اجمالى ما تم دفعه:</strong>
                  {invoiceDetails?.total_paid} ج
                </Typography>
                <Typography variant="body1">
                  <strong>الباقى:</strong> {invoiceDetails?.total_unpaid} ج
                </Typography>
              </Stack>
            </Card>
          </Grid2>
          
          <Grid2 size={{ xs: 12, md: 6 }}>
            {invoiceDetails && !invoiceDetails.is_paid && (
              <QuickPaymentForm
                invoice={invoiceDetails}
                onPaymentSuccess={handleReloadPage}
                compact
              />
            )}
          </Grid2>
        </Grid2>
        
        {/* Payment History */}
        <Grid2 container spacing={3} sx={{ mt: 2 }}>
          <Grid2 size={{ xs: 12 }}>
            {invoiceDetails && (
              <PaymentHistory
                invoiceId={invoiceDetails.id}
                totalAmount={Number(invoiceDetails.total_after_discount)}
              />
            )}
          </Grid2>
        </Grid2>
      </Card>
    </Container>
  );
};

export default InvoiceDetails;
