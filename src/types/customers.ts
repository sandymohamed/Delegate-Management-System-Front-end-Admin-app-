export type TypeCustomer = {
  id: number;
  store_id: number;
  name: string;
  customer_store_name: string;
  email: string;
  phone: string;
  info: string;
  location: string;
  created_at: string;
  total_unpaid_invoices: string | number;

};

export type TypeCustomersListResponse = {
  success: boolean;
  total: number;
  data: TypeCustomer[];
};


export type CreateCustomerFormData = {
  name: string;
  customer_store_name: string;
  email?: string;
  phone?: string;
  info?: string;
  location?: string;
}