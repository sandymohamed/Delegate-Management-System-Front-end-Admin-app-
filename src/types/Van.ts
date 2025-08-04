export type VanProduct = {
  product_id: number;
  product_name: string;
  total_quantity: number;
  price: number;
};

export type Van = {
  id: number;
  store_id: number;
  agent_id: number;
  agent_name?: string;
  name: string;
  plate_number: string;
  created_at: string;
};

export type CreateVanFormData = {
  agent_id: any;
  name: string;
  plate_number: string;
};


export type AddProductFormData = {
  user_id: number;
  van_id: number;
  products?: {  // This should not be optional
    product_id: number;  // Must match Yup's number() type
    quantity: number;
  }[];
  date?: string;  // Optional field
}