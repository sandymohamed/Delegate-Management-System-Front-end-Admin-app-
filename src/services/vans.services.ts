import { CreateVanFormData } from "../types/Van";
import axiosInstance from "../utils/axiosInstance"

export const getVanForAgent =async (user_id: number) => {
    const response = await axiosInstance.get(`/vans/user/${user_id}`)
        .then(res => res?.data?.data)
        .catch(err => err?.response?.data);

        return response;
}

export const getVanById =async (id: number) => {
    const response = await axiosInstance.get(`/vans/${id}`)
        .then(res => res?.data?.data)
        .catch(err => err?.response?.data);

        return response;
}

export const getAllVans =async (
    searchTerm?:string | null,
    limit?: number,
    page?: number,
  ) => {
    const response = await axiosInstance.post('/vans/all/', { searchTerm, limit, page })
        .then(res => res?.data)
        .catch(err => err?.response?.data);

        return response;
}

export const createNewVan =async (data: CreateVanFormData) => {
    const response = await axiosInstance.post('/vans/', data)
        .then(res => res?.data)
        .catch(err => err?.response?.data);

        
        return response;
}

export const editVanAgent =async (id:number, data: CreateVanFormData) => {
    const response = await axiosInstance.put(`/vans/${id}`, data)
        .then(res => res?.data)
        .catch(err => err?.response?.data);

        
        return response;
}