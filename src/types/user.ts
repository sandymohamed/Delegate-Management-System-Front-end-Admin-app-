export type TypeUser = {
  id: number;
  store_id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  created_at: string;
  info?: string | null;
};

export type TypeLogUser = {
  email: string;
  password: string;
};
