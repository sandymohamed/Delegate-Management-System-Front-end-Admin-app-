export type TypePayment = {
  id: number;
  invoice_id: number;
  store_id: number;
  user_id: number;
  payment_date: string;
  amount: string;
  user_name: string;
};

export type AddPaymentFormData = {
  amount: string;
  date?: string;
};

export type TypePaymentSubmitData = AddPaymentFormData & {
  invoice_id: string;
  user_id: number;
};
export type TypePaymentFOrCustomerSubmitData = AddPaymentFormData & {
  customer_id: number;
  user_id: number;
};
