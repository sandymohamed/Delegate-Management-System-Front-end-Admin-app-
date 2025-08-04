import { boolean } from "yup";

export type TypeInvoiceDetails = {
  id: number;
  invoice_number: string;
  store_id: number;
  agent_id: number;

  customer_id: number;
  customer_name: string;
  customer_store_name: string;
  customer_phone: string;
  customer_location: string;
  customer_total_unpaid_invoices: string;

  invoice_id?: string | number;
  invoice_date: string;
  due_date: string ;
  total_price: string | number;
  discount: string | number;
  total_after_discount: string | number;
  is_paid: boolean;
  total_paid: string | number;
  total_unpaid: string | number;
  products: TypeInvoiceProductsDetails[];
  returned_amount: number | null;
  returns: TypeInvoiceReturnProductsDetails[] | null;
};

export type TypeInvoiceProductsDetails = {
  product_id: number;
  product_name: string;
  price: number;
  quantity: number;
  product_total_price: number;
};

export type TypeInvoiceReturnProductsDetails = {
  product_id: number;
  reason?: string;
  return_amount: number;
  return_quantity: number;
  return_date: string;
};

export type TypeInvoiceDetailsResponse = {
  success: boolean;
  data: TypeInvoiceDetails[];
};

export type TypeInvoicesDetails = TypeInvoiceDetails;

// export type TypeInvoicesDetails = {
//   id: number;
//   store_id: number;
//   agent_id: number;
//   customer_id: number;

//   invoice_number: number | string;
//   invoice_date: string;
//   due_date: string;
//   total_price: number | string;
//   discount: number | string;
//   total_after_discount: number | string;
//   is_paid: boolean;
//   total_paid: number | string;
//   total_unpaid: number | string;
//   products: [
//     {
//       price: number;
//       quantity: number;
//       product_id: number;
//       product_name: string;
//       product_total_price: number;
//     }
//   ];
// };

export interface InvoiceProduct {
  product_id: number;
  quantity: number;
  price: number;
}

export interface InvoiceFormData {
  customer_id: any;
  invoice_number?: string;
  discount?: number;
  due_date?: string | null;
  van_id?: number;
  products?: {
    product_id: any;
    quantity: number;
    price: number;
  }[];
}
