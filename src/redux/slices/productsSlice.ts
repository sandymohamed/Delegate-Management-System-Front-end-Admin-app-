import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { VanProduct } from "../../types/Van";

export type ProductState = {
  vanProducts: VanProduct[];
  loading: boolean;
  error: SerializedError | null;
};

// Fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (vanId: number): Promise<VanProduct[] | undefined> => {
    console.log("vanId", vanId);

    const response = await axiosInstance.get(
      `/daily-inventory/van-products/${vanId}`
    );

    if (response.data.success) {
      const formattedData = response.data.data.map((item: VanProduct) => ({
        ...item,
        price: Number(item.price),
        total_quantity: Number(item.total_quantity),
      }));

      return formattedData;
    }

    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    vanProducts: [],
    loading: false,
    error: null,
  } as ProductState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<VanProduct[] | undefined>) => {
          state.loading = false;
          if (action.payload) {
            state.vanProducts = action.payload;
          }
          state.error = null;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default productsSlice.reducer;
