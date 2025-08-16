import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  Chip,
  Divider,
  Alert,
} from "@mui/material";
import { FormTextField } from "./index";
import { useAuth } from "../context/AuthContext";
import { useAlert } from "../context/AlertProvider";
import { addPayment } from "../services/invoices.services";
import { TypeInvoicesDetails } from "../types/invoice";
import { formatDate } from "../utils/dateFormatter";
import Iconify from "./iconify/Iconify";

interface QuickPaymentFormProps {
  invoice: TypeInvoicesDetails;
  onPaymentSuccess?: () => void;
  compact?: boolean;
}

interface QuickPaymentFormData {
  amount: string;
}

const QuickPaymentForm: React.FC<QuickPaymentFormProps> = ({
  invoice,
  onPaymentSuccess = () => {},
  compact = false,
}) => {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quickPaymentSchema = Yup.object().shape({
    amount: Yup.number()
      .required("المبلغ مطلوب")
      .positive("المبلغ يجب أن يكون أكبر من صفر")
      .max(
        Number(invoice.total_unpaid),
        `المبلغ لا يمكن أن يكون أكبر من المتبقي (${invoice.total_unpaid} ج)`
      ),
  });

  const defaultValues: QuickPaymentFormData = {
    amount: invoice.total_unpaid.toString(),
  };

  const methods = useForm<QuickPaymentFormData>({
    resolver: yupResolver(quickPaymentSchema),
    defaultValues,
  });

  const { handleSubmit, setValue, watch } = methods;
  const watchedAmount = watch("amount");

  const handleQuickAmount = (percentage: number) => {
    const amount = (Number(invoice.total_unpaid) * percentage / 100).toString();
    setValue("amount", amount);
  };

  const onSubmit = async (data: QuickPaymentFormData) => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      const paymentData = {
        amount: data.amount,
        date: "",
        invoice_id: invoice.id.toString(),
        user_id: user.id,
      };

      const response = await addPayment(paymentData);
      if (response.success) {
        showAlert("تم تسجيل الدفعة بنجاح!");
        onPaymentSuccess();
      } else {
        showAlert("حدث خطأ في تسجيل الدفعة", { severity: "error" });
      }
    } catch (error) {
      showAlert("حدث خطأ في تسجيل الدفعة", { severity: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const remainingAfterPayment = Number(invoice.total_unpaid) - Number(watchedAmount || 0);
  const willBeFullyPaid = remainingAfterPayment <= 0;

  if (compact) {
    return (
      <Card variant="outlined">
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleQuickAmount(25)}
                  >
                    25%
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleQuickAmount(50)}
                  >
                    50%
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleQuickAmount(100)}
                  >
                    كامل
                  </Button>
                </Stack>

                <FormTextField
                  name="amount"
                  control={methods.control}
                  label="المبلغ"
                  size="small"
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={isSubmitting}
                  fullWidth
                  startIcon={<Iconify icon="tdesign:money" />}
                >
                  دفع {watchedAmount} ج
                </Button>
              </Stack>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader
        title="دفعة سريعة"
        subheader={`فاتورة رقم: ${invoice.invoice_number}`}
        avatar={
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: 'success.lighter',
              color: 'success.main'
            }}
          >
            <Iconify icon="tdesign:money" width={24} />
          </Box>
        }
      />
      <CardContent>
        <Stack spacing={3}>
          {/* Invoice Summary */}
          <Box>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                العميل:
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {invoice.customer_id}
              </Typography>
            </Stack>
            
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                تاريخ الاستحقاق:
              </Typography>
              <Typography variant="body2">
                {formatDate(invoice.due_date)}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                إجمالي الفاتورة:
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {invoice.total_after_discount} ج
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                المدفوع سابقاً:
              </Typography>
              <Typography variant="body2" color="success.main">
                {invoice.total_paid} ج
              </Typography>
            </Stack>

            <Divider sx={{ my: 1 }} />

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6" color="error">
                المتبقي:
              </Typography>
              <Typography variant="h6" color="error">
                {invoice.total_unpaid} ج
              </Typography>
            </Stack>
          </Box>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                {/* Quick Amount Buttons */}
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    مبالغ سريعة:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleQuickAmount(25)}
                    >
                      25% ({(Number(invoice.total_unpaid) * 0.25).toFixed(0)} ج)
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleQuickAmount(50)}
                    >
                      50% ({(Number(invoice.total_unpaid) * 0.5).toFixed(0)} ج)
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleQuickAmount(75)}
                    >
                      75% ({(Number(invoice.total_unpaid) * 0.75).toFixed(0)} ج)
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleQuickAmount(100)}
                    >
                      كامل ({invoice.total_unpaid} ج)
                    </Button>
                  </Stack>
                </Box>

                {/* Amount Input */}
                <FormTextField
                  name="amount"
                  control={methods.control}
                  label="مبلغ الدفعة"
                />

                {/* Payment Preview */}
                {watchedAmount && Number(watchedAmount) > 0 && (
                  <Alert 
                    severity={willBeFullyPaid ? "success" : "info"}
                    icon={<Iconify icon={willBeFullyPaid ? "eva:checkmark-circle-2-fill" : "eva:info-fill"} />}
                  >
                    <Stack spacing={1}>
                      <Typography variant="body2">
                        <strong>معاينة الدفعة:</strong>
                      </Typography>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2">مبلغ الدفعة:</Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {watchedAmount} ج
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2">المتبقي بعد الدفع:</Typography>
                        <Typography 
                          variant="body2" 
                          fontWeight="medium"
                          color={willBeFullyPaid ? "success.main" : "error.main"}
                        >
                          {Math.max(0, remainingAfterPayment)} ج
                        </Typography>
                      </Stack>
                      {willBeFullyPaid && (
                        <Chip 
                          label="سيتم سداد الفاتورة بالكامل" 
                          color="success" 
                          size="small"
                          icon={<Iconify icon="eva:checkmark-circle-2-fill" />}
                        />
                      )}
                    </Stack>
                  </Alert>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  size="large"
                  disabled={isSubmitting || !watchedAmount || Number(watchedAmount) <= 0}
                  startIcon={<Iconify icon="tdesign:money" />}
                >
                  {isSubmitting ? "جاري التسجيل..." : `دفع ${watchedAmount || 0} ج`}
                </Button>
              </Stack>
            </form>
          </FormProvider>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default QuickPaymentForm;