import axiosInstance from "../utils/axiosInstance"

export const getVanProducts =async (vanId: number) => {
    const response = await axiosInstance.get(`/daily-inventory/van-products/${vanId}`)
        .then(res => res?.data?.data)
        .catch(err => err);

        return response;
}