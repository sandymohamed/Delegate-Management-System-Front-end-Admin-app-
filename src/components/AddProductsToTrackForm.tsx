import React, { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import FormTextField from "./FormTextField";

import { useAuth } from "../context/AuthContext";
import { useAlert } from "../context/AlertProvider";

import { AddProductFormData } from "../types/Van";
import { TypeProductsList } from "../types/product";

import FormAutoComplete from "./FormAutoComplete";
import { getAllProductsList } from "../services/products.services";
import { TypeInvoiceProductsDetails } from "../types/invoice";

// --------------------------------------------------------------------------------------------------
interface PaymentFormProps {
  data?: { user_id?: string | number; van_id: string | undefined };

  doAfterSubmit?: () => void;
}
// --------------------------------------------------------------------------------------------------
const AddProductsToTrackForm: React.FC<PaymentFormProps> = ({
  data,
  doAfterSubmit = () => {},
}) => {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const [storeProducts, setStoreProducts] = useState<TypeProductsList[] | null>(
    null
  );

  useEffect(() => {
    getAllProductsList().then((res) => {
      console.log(res?.data);

      setStoreProducts(res?.data);
    });
  }, []);

  // FORM
  const addProductsSchema = Yup.object().shape({
    user_id: Yup.number().required("User ID is required"),
    van_id: Yup.number().required("Van ID is required"),
    products: Yup.array() // Remove .optional() to make it required
      .of(
        Yup.object().shape({
          product_id: Yup.number().required("Product ID is required"), // Change from mixed() to number()
          quantity: Yup.number().required("Quantity is required"),
        })
      )
      .min(1, "At least one product is required"), // Ensure array isn't empty
    date: Yup.string(),
  });

  const defaultValues: AddProductFormData = {
    user_id: Number(data?.user_id || 0),
    van_id: Number(data?.van_id || 0),
    products: [
      {
        product_id: 0,
        quantity: 0,
      },
    ],
    date: "",
  };

  const methods = useForm<AddProductFormData>({
    resolver: yupResolver(addProductsSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const handleAddProduct = () => {
    append({
      product_id: 0,
      quantity: 0,
    });
  };

  const handleRemoveProduct = (index: number) => {
    remove(index);
  };

  const onSubmit = async (data: AddProductFormData) => {
    try {
      console.log("data", data);
    } catch (err) {
      showAlert(" حدث خطأ يرجى المحاولة مرة اخرى!" + `${err}`, {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        title={"إضافة منتجات جديد"}
        subheader={
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box></Box>
          </Stack>
        }
      />
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
                  sm: "repeat(1, 1fr)",
                }}
              >
                {fields?.map((field, index) => {
                  return (
                    <Box
                      rowGap={3}
                      columnGap={2}
                      display="grid"
                      key={field.id}
                      sx={{
                        p: 2,
                        m: 4,
                        borderRadius: 2,
                        boxShadow: "1px 1px 1px 1px #eee",
                        alignItems: "flex-end",
                        justifyContent: "center",
                      }}
                    >
                      <FormAutoComplete
                        name={`products.${index}.product_id`}
                        control={control}
                        label="المنتج"
                        options={storeProducts || [{}]}
                        getOptionLabel={(option: TypeProductsList) =>
                          option.name || ""
                        }
                        isOptionEqualToValue={(
                          option: TypeProductsList,
                          value: TypeProductsList
                        ) => option.id === value?.id}
                      />
                      <FormTextField
                        name={`products.${index}.quantity`}
                        control={control}
                        label="الكمية"
                      />

                      <Box>
                        <Button
                          type="button"
                          variant="text"
                          onClick={() => handleAddProduct()}
                        >
                          اضافة منتج اخر
                        </Button>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="text"
                            color="error"
                            onClick={() => handleRemoveProduct(index)}
                          >
                            حذف هذا المنتج
                          </Button>
                        )}
                      </Box>
                    </Box>
                  );
                })}
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
  );
};

export default AddProductsToTrackForm;
