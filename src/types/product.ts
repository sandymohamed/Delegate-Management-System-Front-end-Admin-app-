export type TypeProductsList = {
  id: number;
  store_id: number;
  name: string;
  price: number;
  stock_quantity: number;
  created_at: string;
  description: string | null;
  qr_code: string | null;
  exp_date: string | null;
};

export type TypeProductsListResponse = {
  success: boolean;
  data: {
    success: boolean;
    total: number;
    data: TypeProductsList[];
  };
};

export type TypeProductsReturnedList = {
  id: number;
  store_id: number;
  name: string;
  price: number;
  stock_quantity: number;
  created_at: string;
  description: string | null;
  qr_code: string | null;
  exp_date: string | null;
  agent_name: string;
  return_date: string;
  return_quantity: number;
  return_amount: number;
  reason: string | null;
};
export type TypeProductsReturnedListResponse = {
  success: boolean;
  data: {
    success: boolean;
    total: number;
    data: TypeProductsList[];
  };
};

export type CreateProductFormData = {
  name: string;
  price: number;
  description?: string | null;
  qr_code?: string | null;
  stock_quantity: number;
  exp_date?: string | null;
};

// returns:

export interface AddReturnFormData {
  products?: {
    invoice_id?: number;
    product_id: number | any;
    return_quantity: number;
    reason?: string;
  }[];
}

export interface AddReturnSubmitFormData {
  invoice_id?: number;
  product_id: number;
  return_quantity: number;
  reason?: string;
}

export interface ReturnSearch {
  start_date: Date | null;
  end_date: Date | null;
  searchTerm: string | null;
}
