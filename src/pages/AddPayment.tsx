import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useParams, } from "react-router-dom";
import {
  PaymentForm,
  TableBodyCell,
  TableHeadCell,
  TableHeadRow,
} from "../components";
import { useAuth } from "../context/AuthContext";
import {
  getInvoiceById,
  getPaymentById,
} from "../services/invoices.services";
import { formatDate } from "../utils/dateFormatter";
import { TypeInvoiceDetails } from "../types/invoice";
import {
  TypePayment,
} from "../types/payment";
// -------------------------------------------------------
const AddPayment: React.FC = () => {
  const { user } = useAuth();

  const { invoice_id } = useParams();

  // Table:
  const [paymentHistory, setPaymentHistory] = useState<TypePayment[] | null>(
    null
  );
  const [invoice, setInvoice] = useState<TypeInvoiceDetails | null>(null);

  const handleReloadPage = () => {
    getInvoiceById(Number(invoice_id)).then((res) => {
      setInvoice(res);
    });

    getPaymentById(Number(invoice_id)).then((res) => {
      setPaymentHistory(res);
    });
  };

  useEffect(() => {
    console.log("user", user);
    handleReloadPage();
  }, []);


  return (
    <Container>
      <PaymentForm
        invoice={invoice}
        invoice_id={invoice_id}
        doAfterSubmit={handleReloadPage}
      />

      <Divider sx={{ my: 3, border: "none" }} />
      <Card>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableHeadRow>
                <TableHeadCell> رقم الفاتورة</TableHeadCell>
                <TableHeadCell> المندوب</TableHeadCell>
                <TableHeadCell>التاريخ </TableHeadCell>
                <TableHeadCell> مبلغ السداد</TableHeadCell>

                <TableHeadCell>المبلغ الكلي </TableHeadCell>
                <TableHeadCell>المتبقي </TableHeadCell>
                <TableHeadCell>ما تم سداده </TableHeadCell>
              </TableHeadRow>
            </TableHead>
            <TableBody>
              {paymentHistory && paymentHistory?.length
                ? paymentHistory?.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableBodyCell>{row?.invoice_id}</TableBodyCell>
                      <TableBodyCell>{row?.user_name} </TableBodyCell>
                      <TableBodyCell>
                        {formatDate(row?.payment_date || "")}
                      </TableBodyCell>
                      <TableBodyCell>{row?.amount} </TableBodyCell>

                      <TableBodyCell>
                        {invoice?.total_after_discount}
                      </TableBodyCell>
                      <TableBodyCell>{invoice?.total_unpaid}</TableBodyCell>
                      <TableBodyCell>{invoice?.total_paid}</TableBodyCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
};

export default AddPayment;
