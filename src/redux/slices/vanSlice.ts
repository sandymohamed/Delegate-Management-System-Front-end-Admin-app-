import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { Van } from "../../types/Van";

export type VanState = {
  vanDetails: Van;
  loading: boolean;
  error: SerializedError | null;
};

// Fetch products
export const fetchVan = createAsyncThunk(
  "van/fetchVan",
  async (user_id: number): Promise<Van | undefined> => {
    const response = await axiosInstance.get(`/vans/user/${user_id}`);
    console.log("response", response);

    if (response.data.success) {
      return response.data.data[0];
    }
  }
);

const vanSlice = createSlice({
  name: "van",
  initialState: {
    vanDetails: {},
    loading: false,
    error: null,
  } as VanState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchVan.fulfilled,
        (state, action: PayloadAction<Van | undefined>) => {
          state.loading = false;
          if (action.payload) {
            state.vanDetails = action.payload;
          }
          state.error = null;
        }
      )
      .addCase(fetchVan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default vanSlice.reducer;
