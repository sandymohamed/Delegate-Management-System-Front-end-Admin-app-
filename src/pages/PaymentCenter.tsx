import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid2,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Chip,
  Tab,
  Tabs,
  Alert,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Iconify from "../components/iconify/Iconify";
import { icons } from "../components/iconify/IconRegistry";
import {
  PaymentForm,
  SimpleDialog,
  TableBodyCell,
  TableHeadCell,
  TableHeadRow,
} from "../components";
import { useAuth } from "../context/AuthContext";
import { getAllInvoices } from "../services/invoices.services";
import { formatDate } from "../utils/dateFormatter";
import { TypeInvoicesDetails } from "../types/invoice";
import { useAlert } from "../context/AlertProvider";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`payment-tabpanel-${index}`}
      aria-labelledby={`payment-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const PaymentCenter: React.FC = () => {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  
  const [tabValue, setTabValue] = useState(0);
  const [unpaidInvoices, setUnpaidInvoices] = useState<TypeInvoicesDetails[] | null>(null);
  const [partiallyPaidInvoices, setPartiallyPaidInvoices] = useState<TypeInvoicesDetails[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  // Dialog states
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<TypeInvoicesDetails | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenPaymentDialog = (invoice: TypeInvoicesDetails) => {
    setSelectedInvoice(invoice);
    setPaymentDialogOpen(true);
  };

  const handleClosePaymentDialog = () => {
    setPaymentDialogOpen(false);
    setSelectedInvoice(null);
    loadInvoices();
  };

  const loadInvoices = async () => {
    if (!user) return;

    try {
      const response = await getAllInvoices(user.id, searchTerm, 1000, 1);
      if (response?.data) {
        const invoices = response.data;
        
        // Separate unpaid and partially paid invoices
        const unpaid = invoices.filter((invoice: TypeInvoicesDetails) => 
          !invoice.is_paid && Number(invoice.total_paid) === 0
        );
        
        const partiallyPaid = invoices.filter((invoice: TypeInvoicesDetails) => 
          !invoice.is_paid && Number(invoice.total_paid) > 0
        );

        setUnpaidInvoices(unpaid);
        setPartiallyPaidInvoices(partiallyPaid);
      }
    } catch (error) {
      showAlert("حدث خطأ في تحميل الفواتير", { severity: "error" });
    }
  };

  useEffect(() => {
    loadInvoices();
  }, [user, searchTerm]);

  const calculateTotalOutstanding = (invoices: TypeInvoicesDetails[] | null) => {
    if (!invoices) return 0;
    return invoices.reduce((total, invoice) => total + Number(invoice.total_unpaid), 0);
  };

  const InvoiceTable = ({ invoices, title }: { invoices: TypeInvoicesDetails[] | null, title: string }) => (
    <Card>
      <CardHeader 
        title={title}
        subheader={
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2">
              عدد الفواتير: {invoices?.length || 0}
            </Typography>
            <Typography variant="body2" color="error">
              إجمالي المبلغ المستحق: {calculateTotalOutstanding(invoices)} ج
            </Typography>
          </Stack>
        }
      />
      <CardContent>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableHeadRow>
                <TableHeadCell>رقم الفاتورة</TableHeadCell>
                <TableHeadCell>العميل</TableHeadCell>
                <TableHeadCell>تاريخ الاستحقاق</TableHeadCell>
                <TableHeadCell>المبلغ الإجمالي</TableHeadCell>
                <TableHeadCell>المدفوع</TableHeadCell>
                <TableHeadCell>المتبقي</TableHeadCell>
                <TableHeadCell>الحالة</TableHeadCell>
                <TableHeadCell>الإجراءات</TableHeadCell>
              </TableHeadRow>
            </TableHead>
            <TableBody>
              {invoices?.map((invoice) => {
                const isOverdue = new Date(invoice.due_date) < new Date();
                const paymentProgress = (Number(invoice.total_paid) / Number(invoice.total_after_discount)) * 100;
                
                return (
                  <TableRow key={invoice.id}>
                    <TableBodyCell>
                      <Link component={RouterLink} to={`/invoice/${invoice.id}`}>
                        {invoice.invoice_number}
                      </Link>
                    </TableBodyCell>
                    <TableBodyCell>{invoice.customer_id}</TableBodyCell>
                    <TableBodyCell>
                      <Typography color={isOverdue ? "error" : "inherit"}>
                        {formatDate(invoice.due_date)}
                        {isOverdue && (
                          <Chip 
                            label="متأخر" 
                            color="error" 
                            size="small" 
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Typography>
                    </TableBodyCell>
                    <TableBodyCell>{invoice.total_after_discount} ج</TableBodyCell>
                    <TableBodyCell>
                      <Stack direction="column" spacing={0.5}>
                        <Typography>{invoice.total_paid} ج</Typography>
                        {Number(invoice.total_paid) > 0 && (
                          <Box sx={{ width: 100, height: 4, bgcolor: 'grey.300', borderRadius: 2 }}>
                            <Box 
                              sx={{ 
                                width: `${paymentProgress}%`, 
                                height: '100%', 
                                bgcolor: 'success.main', 
                                borderRadius: 2 
                              }} 
                            />
                          </Box>
                        )}
                      </Stack>
                    </TableBodyCell>
                    <TableBodyCell>
                      <Typography color="error" fontWeight="bold">
                        {invoice.total_unpaid} ج
                      </Typography>
                    </TableBodyCell>
                    <TableBodyCell>
                      {Number(invoice.total_paid) === 0 ? (
                        <Chip label="غير مدفوع" color="error" size="small" />
                      ) : (
                        <Chip label="مدفوع جزئياً" color="warning" size="small" />
                      )}
                    </TableBodyCell>
                    <TableBodyCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          onClick={() => handleOpenPaymentDialog(invoice)}
                          startIcon={<Iconify icon="tdesign:money" />}
                        >
                          دفع
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          component={RouterLink}
                          to={`/invoice/${invoice.id}`}
                          startIcon={<Iconify icon="eva:eye-fill" />}
                        >
                          عرض
                        </Button>
                      </Stack>
                    </TableBodyCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl">
      <Stack spacing={3}>
        {/* Header */}
        <Box>
          <Typography variant="h4" gutterBottom>
            مركز المدفوعات
          </Typography>
          <Typography variant="body1" color="text.secondary">
            إدارة مدفوعات العملاء والفواتير المستحقة
          </Typography>
        </Box>

        {/* Summary Cards */}
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'error.lighter',
                      color: 'error.main'
                    }}
                  >
                    <Iconify icon="eva:file-text-fill" width={24} />
                  </Box>
                  <Box>
                    <Typography variant="h4" color="error">
                      {unpaidInvoices?.length || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      فواتير غير مدفوعة
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'warning.lighter',
                      color: 'warning.main'
                    }}
                  >
                    <Iconify icon="eva:clock-fill" width={24} />
                  </Box>
                  <Box>
                    <Typography variant="h4" color="warning.main">
                      {partiallyPaidInvoices?.length || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      فواتير مدفوعة جزئياً
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'error.lighter',
                      color: 'error.main'
                    }}
                  >
                    <Iconify icon="tdesign:money" width={24} />
                  </Box>
                  <Box>
                    <Typography variant="h4" color="error">
                      {calculateTotalOutstanding(unpaidInvoices)} ج
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      إجمالي غير المدفوع
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'warning.lighter',
                      color: 'warning.main'
                    }}
                  >
                    <Iconify icon="eva:trending-up-fill" width={24} />
                  </Box>
                  <Box>
                    <Typography variant="h4" color="warning.main">
                      {calculateTotalOutstanding(partiallyPaidInvoices)} ج
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      إجمالي الجزئي
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>

        {/* Search */}
        <Card>
          <CardContent>
            <TextField
              fullWidth
              placeholder="البحث في الفواتير..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon={icons.search} width={20} />
                  </InputAdornment>
                ),
              }}
            />
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab 
                label={`الفواتير غير المدفوعة (${unpaidInvoices?.length || 0})`}
                icon={<Iconify icon="eva:alert-circle-fill" />}
                iconPosition="start"
              />
              <Tab 
                label={`الفواتير المدفوعة جزئياً (${partiallyPaidInvoices?.length || 0})`}
                icon={<Iconify icon="eva:clock-fill" />}
                iconPosition="start"
              />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            {unpaidInvoices?.length === 0 ? (
              <Alert severity="success">
                <Typography>لا توجد فواتير غير مدفوعة! 🎉</Typography>
              </Alert>
            ) : (
              <InvoiceTable invoices={unpaidInvoices} title="الفواتير غير المدفوعة" />
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            {partiallyPaidInvoices?.length === 0 ? (
              <Alert severity="info">
                <Typography>لا توجد فواتير مدفوعة جزئياً</Typography>
              </Alert>
            ) : (
              <InvoiceTable invoices={partiallyPaidInvoices} title="الفواتير المدفوعة جزئياً" />
            )}
          </TabPanel>
        </Card>

        {/* Payment Dialog */}
        <SimpleDialog
          open={paymentDialogOpen}
          onClose={handleClosePaymentDialog}
          title="تسجيل دفعة جديدة"
        >
          {selectedInvoice && (
            <PaymentForm
              invoice={selectedInvoice}
              invoice_id={selectedInvoice.id.toString()}
              doAfterSubmit={handleClosePaymentDialog}
            />
          )}
        </SimpleDialog>
      </Stack>
    </Container>
  );
};

export default PaymentCenter;