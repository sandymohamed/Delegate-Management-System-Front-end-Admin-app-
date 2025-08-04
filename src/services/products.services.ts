import {
  AddReturnSubmitFormData,
  CreateProductFormData,
  ReturnSearch,
} from "../types/product";
import axiosInstance from "../utils/axiosInstance";

export const getProductsList = async (
  searchTerm: string | null | undefined = null,
  limit: number = 100,
  page: number
) => {
  const response = await axiosInstance
    .post("/products/", { searchTerm, limit, page })
    .then((res) => res?.data?.data)
    .catch((err) => err);

  return response;
};


export const getReturnedProductsList = async (
  search: ReturnSearch | null | undefined = null,
  limit: number = 100,
  page: number
) => {
  const response = await axiosInstance
    .post("/products/returns/products/", { search, limit, page })
    .then((res) => res?.data?.data)
    .catch((err) => err);

  return response;
};


export const getAllProductsList = async () => {
  const response = await axiosInstance
    .get("/products/")
    .then((res) => res?.data?.data)
    .catch((err) => err);

  return response;
};

export const getProductById = async (id: number) => {
  const response = await axiosInstance
    .get(`/products/${id}`)
    .then((res) => res?.data?.data[0])
    .catch((err) => err);

  return response;
};
export const addNewProduct = async (data: CreateProductFormData) => {
  const response = await axiosInstance
    .post("/products/create", data)
    .then((res) => res?.data?.data)
    .catch((err) => err);

  return response;
};

// returns:
export const addNewReturns = async (data: AddReturnSubmitFormData[]) => {
  const response = await axiosInstance
    .post("/products/returns/", data)
    .then((res) => res?.data)
    .catch((err) => err);

  return response;
};
