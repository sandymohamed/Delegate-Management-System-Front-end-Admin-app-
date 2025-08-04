import React from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  TypeInvoiceDetails,
  TypeInvoiceProductsDetails,
} from "../types/invoice";
import FormTextField from "./FormTextField";

import FormAutoComplete from "./FormAutoComplete";
import { addNewReturns } from "../services/products.services";
import { AddReturnFormData } from "../types/product";
import { useAlert } from "../context/AlertProvider";

interface AddReturnFormProps {
  invoice: TypeInvoiceDetails | null;
  invoice_id: string | number;
  doAfterSubmit?: () => void;
}

// --------------------------------------------------------------------------------------------------
const AddReturnForm: React.FC<AddReturnFormProps> = ({
  invoice = null,
  invoice_id = null,
  doAfterSubmit = () => {},
}) => {
  const { showAlert } = useAlert();

  // FORM
  const AddReturnFormSchema = Yup.object().shape({
    products: Yup.array().of(
      Yup.object().shape({
        product_id: Yup.mixed()
          .nullable()
          .required("يجب تحديد المنتج المراد ارجاعه"),
        return_quantity: Yup.number().required("يجب تحديد كمية المرتجع"),
        reason: Yup.string(),
      })
    ),
  });

  const defaultValues: AddReturnFormData = {
    products: [
      {
        product_id: 0,
        return_quantity: 0,
        reason: "",
      },
    ],
  };

  const methods = useForm<AddReturnFormData>({
    resolver: yupResolver(AddReturnFormSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });
  const handleAddProduct = () => {
    append({
      product_id: 0,
      return_quantity: 0,
      reason: "",
    });
  };

  const handleRemoveProduct = (index: number) => {
    remove(index);
  };

  const onSubmit = async (data: AddReturnFormData) => {
    try {
      if (invoice_id && data?.products?.length) {
        let formattedData = data.products.map((product) => ({
          ...product,
          product_id: product.product_id.product_id,
          invoice_id: Number(invoice_id),
        }));

        await addNewReturns(formattedData).then(async (res) => {
          if (res.success) {
            doAfterSubmit();
             showAlert("تمت بنجاح!");
          } else {
             showAlert(" حدث خطأ يرجى المحاولة مرة اخرى!" + `${res?.response?.data?.error}`, {
              severity: "error",
              autoHideDuration: 3000,
            });
          }
        });
      }
    } catch (err) {
      showAlert(" حدث خطأ يرجى المحاولة مرة اخرى!" + `${err}`, {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <Card>
      <CardHeader
        title={`ارجاع منتجات من  : ${invoice?.customer_name}`}
        subheader={
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography>
                اجمالى فواتير العميل التى لم يتم سدادها:
                <Typography variant="h6" color="error" component={"span"}>
                  {invoice?.customer_total_unpaid_invoices}
                </Typography>
              </Typography>

              <Typography>
                اجمالى ما لم يتم سداده من هذه الفاتورة
                <Typography variant="h6" color="error" component={"span"}>
                  {invoice?.total_unpaid}
                </Typography>
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                component={RouterLink}
                to={`/invoice/${invoice_id}`}
              >
                تفاصيل الفاتورة
              </Button>
            </Box>
          </Stack>
        }
      />
      <CardContent>
        <Paper sx={{ p: 2 }}>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack
                direction="column"
                spacing={0}
                alignItems="center"
                justifyContent="start"
              >
                {fields?.map((field, index) => {
                  return (
                    <Box
                      rowGap={3}
                      columnGap={2}
                      display="grid"
                      gridTemplateColumns={{
                        xs: "repeat(2, 1fr)",
                        sm: "repeat(5, 1fr)",
                      }}
                      key={field.id}
                      sx={{
                        p: 2,
                        mt: 2,
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
                        options={invoice?.products || [{}]}
                        getOptionLabel={(option: TypeInvoiceProductsDetails) =>
                          option.product_name || ""
                        }
                        isOptionEqualToValue={(
                          option: TypeInvoiceProductsDetails,
                          value: TypeInvoiceProductsDetails
                        ) => option.product_id === value?.product_id}
                      />
                      <FormTextField
                        name={`products.${index}.return_quantity`}
                        control={control}
                        label="الكمية"
                      />
                      <FormTextField
                        name={`products.${index}.reason`}
                        control={control}
                        label="سبب الاسترجاع"
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
              </Stack>
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

export default AddReturnForm;
