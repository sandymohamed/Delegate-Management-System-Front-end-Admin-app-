import React, { useEffect, useState } from "react";
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
import { FormAutoComplete, FormTextField } from "../components";
import { CreateVanFormData, Van } from "../types/Van";
import { useAlert } from "../context/AlertProvider";
import { createNewVan, editVanAgent } from "../services/vans.services";
import { getAllAgents } from "../services/users.services";
import { TypeUser } from "../types/user";
// -------------------------------------------------------
type CreateVanProp = {
  isEdit: boolean;
  editData: Van | null;
  handleAfterSubmit?: () => void;
};

// -------------------------------------------------------

const CreateVan: React.FC<CreateVanProp> = ({
  isEdit = false,
  editData = null,
  handleAfterSubmit= null,
}) => {
  const { showAlert } = useAlert();

  const [agents, setAgents] = useState(null);

  const CreateVanSchema = Yup.object().shape({
    name: Yup.string().required("نوع الشاحنة مطلوب"),
    plate_number: Yup.string().required("رقم الشاحنة مطلوب"),
    agent_id: Yup.mixed().nullable().required("يجب اختيار عميل لهذه العربة"),
  });

  const defaultValues: CreateVanFormData = {
    name: editData ? editData?.name : "",
    plate_number: editData ? editData?.plate_number : "",
    agent_id: editData ? editData?.agent_id : null,
  };

  const methods = useForm<CreateVanFormData>({
    resolver: yupResolver(CreateVanSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    getAllAgents().then((res) => {
      setAgents(res);
    });
  }, []);
  const onSubmit = async (data: CreateVanFormData) => {
    console.log("data", data);
    data.agent_id = data.agent_id.id;

    try {
      if (!isEdit) {
        await createNewVan(data).then((res) => {
          if (res.success) showAlert("تم اضافة الشاحنة  بنجاح");
          else
            showAlert(
              "  حدث خطأ يرجى المحاولة مرة اخرى!  " + ` ${res.error} `,
              {
                severity: "error",
              }
            );
          reset();
        });
      } else {
        await editVanAgent(editData?.id || 0, data).then((res) => {
          if (res.success) showAlert(" تم تعديل المندوب بنجاح ");
          else
            showAlert(
              "  حدث خطأ يرجى المحاولة مرة اخرى!  " + ` ${res.error} `,
              {
                severity: "error",
              }
            );
          reset();
          if(handleAfterSubmit) {
            handleAfterSubmit();
          }
        });
      }
    } catch (err) {
      showAlert(" حدث خطأ يرجى المحاولة مرة اخرى!  " + ` ${err} `, {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <Container>
      <Card>
        <CardHeader title={isEdit ? "تغيير المندوب ": "اضافة  شاحنة جديدة"} />
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
                  {!isEdit && (
                    <>
                      <FormTextField
                        name="name"
                        control={methods.control}
                        label="موديل الشاحنة"
                      />
                      <FormTextField
                        name="plate_number"
                        control={methods.control}
                        label="رقم الشاحنة "
                      />
                    </>
                  )}

                  {/* <FormTextField
                    name="agent_id"
                    control={methods.control}
                    label="المندوب"
                  /> */}

                  <FormAutoComplete
                    control={methods.control}
                    name="agent_id"
                    label="المندوب"
                    options={agents || []}
                    getOptionLabel={(option: TypeUser) => option.name || ""}
                    isOptionEqualToValue={(option: TypeUser, value: TypeUser) =>
                      option.id === value?.id
                    }
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

export default CreateVan;
