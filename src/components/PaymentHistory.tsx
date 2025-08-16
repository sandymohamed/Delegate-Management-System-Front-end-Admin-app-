import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Stack,
  Chip,
  Box,
  Alert,
} from "@mui/material";
import { TableBodyCell, TableHeadCell, TableHeadRow } from "./index";
import { getPaymentById } from "../services/invoices.services";
import { formatDate } from "../utils/dateFormatter";
import { TypePayment } from "../types/payment";
import Iconify from "./iconify/Iconify";

interface PaymentHistoryProps {
  invoiceId: number;
  totalAmount?: number;
  onPaymentsLoaded?: (payments: TypePayment[]) => void;
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({
  invoiceId,
  totalAmount = 0,
  onPaymentsLoaded = () => {},
}) => {
  const [payments, setPayments] = useState<TypePayment[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        setLoading(true);
        const response = await getPaymentById(invoiceId);
        setPayments(response || []);
        onPaymentsLoaded(response || []);
      } catch (error) {
        console.error("Error loading payments:", error);
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, [invoiceId]);

  const totalPaid = payments?.reduce((sum, payment) => sum + Number(payment.amount), 0) || 0;
  const paymentCount = payments?.length || 0;

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Typography>جاري تحميل سجل المدفوعات...</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader
        title="سجل المدفوعات"
        subheader={
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2">
              عدد الدفعات: {paymentCount}
            </Typography>
            <Typography variant="body2" color="success.main">
              إجمالي المدفوع: {totalPaid} ج
            </Typography>
          </Stack>
        }
        avatar={
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: 'primary.lighter',
              color: 'primary.main'
            }}
          >
            <Iconify icon="eva:list-fill" width={24} />
          </Box>
        }
      />
      <CardContent>
        {!payments || payments.length === 0 ? (
          <Alert severity="info" icon={<Iconify icon="eva:info-fill" />}>
            لم يتم تسجيل أي دفعات لهذه الفاتورة بعد
          </Alert>
        ) : (
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableHeadRow>
                  <TableHeadCell>التاريخ</TableHeadCell>
                  <TableHeadCell>المبلغ</TableHeadCell>
                  <TableHeadCell>المندوب</TableHeadCell>
                  <TableHeadCell>الحالة</TableHeadCell>
                </TableHeadRow>
              </TableHead>
              <TableBody>
                {payments.map((payment, index) => (
                  <TableRow key={payment.id}>
                    <TableBodyCell>
                      <Stack>
                        <Typography variant="body2">
                          {formatDate(payment.payment_date)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          الدفعة #{index + 1}
                        </Typography>
                      </Stack>
                    </TableBodyCell>
                    <TableBodyCell>
                      <Typography variant="body2" fontWeight="medium" color="success.main">
                        {payment.amount} ج
                      </Typography>
                    </TableBodyCell>
                    <TableBodyCell>
                      <Typography variant="body2">
                        {payment.user_name}
                      </Typography>
                    </TableBodyCell>
                    <TableBodyCell>
                      <Chip 
                        label="مؤكد" 
                        color="success" 
                        size="small"
                        icon={<Iconify icon="eva:checkmark-circle-2-fill" />}
                      />
                    </TableBodyCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Payment Summary */}
        {payments && payments.length > 0 && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  عدد الدفعات:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {paymentCount} دفعة
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  إجمالي المدفوع:
                </Typography>
                <Typography variant="body2" fontWeight="medium" color="success.main">
                  {totalPaid} ج
                </Typography>
              </Stack>
              {totalAmount > 0 && (
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    المتبقي:
                  </Typography>
                  <Typography 
                    variant="body2" 
                    fontWeight="medium" 
                    color={totalAmount - totalPaid <= 0 ? "success.main" : "error.main"}
                  >
                    {Math.max(0, totalAmount - totalPaid)} ج
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentHistory;