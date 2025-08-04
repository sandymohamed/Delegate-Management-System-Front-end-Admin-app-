import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Paper,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { addNewCustomer } from "../services/customers.services";
import { FormTextField } from "../components";
import { CreateCustomerFormData } from "../types/customers";
import { useAlert } from "../context/AlertProvider";
// -------------------------------------------------------
const CreateCustomer: React.FC = () => {
  const { showAlert } = useAlert();

  const CreateCustomerSchema = Yup.object().shape({
    name: Yup.string().required("اسم العميل مطلوب"),
    customer_store_name: Yup.string().required("اسم المحل مطلوب"),
    email: Yup.string().email("يجب ان يكون الايميل صحيح"),
    phone: Yup.string(),
    info: Yup.string(),
    location: Yup.string(),
  });

  const defaultValues: CreateCustomerFormData = {
    name: "",
    customer_store_name: "",
    email: "",
    phone: "",
    info: "",
    location: "",
  };

  const methods = useForm<CreateCustomerFormData>({
    resolver: yupResolver(CreateCustomerSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: CreateCustomerFormData) => {
    try {
      await addNewCustomer(data).then(() => {
        showAlert("تم اضافة العميل بنجاح");
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
        <CardHeader title="اضافة عميل جديد" />
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
                    label="الاسم"
                  />
                  <FormTextField
                    name="customer_store_name"
                    control={methods.control}
                    label="اسم المتجر"
                  />

                  <FormTextField
                    name="email"
                    control={methods.control}
                    label="الايميل"
                  />

                  <FormTextField
                    name="phone"
                    control={methods.control}
                    label="الهاتف"
                  />

                  <FormTextField
                    name="location"
                    control={methods.control}
                    label="العنوان"
                  />

                  <FormTextField
                    name="info"
                    control={methods.control}
                    label="تفاصيل اخرى"
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

export default CreateCustomer;
