import { CreateCustomerFormData } from "../types/customers";
import axiosInstance from "../utils/axiosInstance";

export const getAllCustomers = async (
  searchTerm?:string | null,
  limit?: number,
  page?: number,
) => {
  const response = await axiosInstance
    .post(`/customers/`, { searchTerm, limit, page })
    .then((res) => res?.data)
    .catch((err) => err);

  return response;
};

export const getCustomerById = async (id: number) => {
  const response = await axiosInstance
    .get(`/customers/${id}`)
    .then((res) => res?.data?.data[0])
    .catch((err) => err);

  return response;
};
export const addNewCustomer = async (data: CreateCustomerFormData) => {
  const response = await axiosInstance
    .post("/customers/create", data)
    .then((res) => res?.data?.data)
    .catch((err) => err);

  return response;
};
