import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Paper,
} from "@mui/material";
import { FormDatePicker, FormTextField } from "../components";
import { CreateProductFormData } from "../types/product";
import { addNewProduct } from "../services/products.services";
import { formatDate } from "../utils/dateFormatter";
import { useAlert } from "../context/AlertProvider";
// -------------------------------------------------------
const CreateProduct: React.FC = () => {
  const { showAlert } = useAlert();

  const CreateProductSchema = Yup.object().shape({
    name: Yup.string().required("اسم المنتج مطلوب"),
    price: Yup.number().required("سعر المنتج مطلوب"),
    description: Yup.string().nullable(),
    qr_code: Yup.string().nullable(),
    stock_quantity: Yup.number().required("اسم المنتج مطلوب"),
    exp_date: Yup.string().nullable(),
  });

  const defaultValues: CreateProductFormData = {
    name: "",
    price: 0,
    description: "",
    qr_code: "",
    stock_quantity: 0,
    exp_date: null,
  };

  const methods = useForm<CreateProductFormData>({
    resolver: yupResolver(CreateProductSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: CreateProductFormData) => {
    console.log("data", data);

    if (data.exp_date) {
      data.exp_date = formatDate(data.exp_date);
    }
    try {
      await addNewProduct(data).then(() => {
        showAlert("تم اضافة المنتج بنجاح");
        reset();
      });
    } catch (err) {
      showAlert(" حدث خطأ يرجى المحاولة مرة اخرى!" + `${err}`, {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <Container>
      <Card>
        <CardHeader title="اضافة منتج جديد" />
        <CardContent>
          <Paper sx={{ p: 2 }}>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                  }}
                >
                  <FormTextField
                    name="name"
                    control={methods.control}
                    label="اسم المنتج"
                  />

                  <FormTextField
                    name="price"
                    control={methods.control}
                    label="سعر المنتج"
                  />

                  <FormTextField
                    name="description"
                    control={methods.control}
                    label="الوصف"
                  />

                  <FormTextField
                    name="qr_code"
                    control={methods.control}
                    label="الباركود"
                  />

                  <FormTextField
                    name="stock_quantity"
                    control={methods.control}
                    label="الكمية"
                  />

                  <FormDatePicker
                    name="exp_date"
                    control={methods.control}
                    label="  تاريخ انتهاء الصلاحية"
                  />
                </Box>

                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                  columnGap={2}
                  mt={2}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={isSubmitting}
                  >
                    حفظ
                  </Button>
                </Box>
              </form>
            </FormProvider>
          </Paper>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CreateProduct;
