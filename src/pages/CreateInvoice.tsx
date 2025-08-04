import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import {
  FormAutoComplete,
  FormDatePicker,
  FormTextField,
  SimpleDialog,
} from "../components";
import { fetchProducts } from "../redux/slices/productsSlice";
import { createNewInvoice } from "../services/invoices.services";
import { getAllCustomers } from "../services/customers.services";
import { formatDate } from "../utils/dateFormatter";
import { TypeCustomer } from "../types/customers";
import { AppDispatch, RootState } from "../redux/store";
import { Van, VanProduct } from "../types/Van";
import { InvoiceFormData, InvoiceProduct } from "../types/invoice";
import CreateCustomer from "./CreateCustomer";
import { useAlert } from "../context/AlertProvider";

// -----------------------------------------------------------
const CreateInvoice: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { showAlert } = useAlert();

  const vanProducts: VanProduct[] = useSelector(
    (state: RootState) => state.products.vanProducts
  );
  const vanDetails: Van | null = useSelector(
    (state: RootState) => state.van.vanDetails
  );

  // Dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    handleGetAllCustomers();
    setOpen(false);
  };

  const [customers, setCustomers] = useState<TypeCustomer[]>([]);
  const [selectedProductsDetails, setSelectedProductsDetails] = useState<
    VanProduct[] | null
  >(null);

  const createInvoiceSchema = Yup.object().shape({
    customer_id: Yup.mixed().required("العميل مطلوب"),
    invoice_number: Yup.string(),
    discount: Yup.number().min(0, "يجب ان يكون الخصم اكبر من 0"),
    due_date: Yup.string().required("تاريخ الاستحقاق مطلوب"),
    products: Yup.array()
      .of(
        Yup.object().shape({
          product_id: Yup.mixed()
            .nullable()
            .required("المنتج مطلوب")

            .test("valid-product", "المنتج غير صالح", function (value: any) {
              return !!vanProducts.find(
                (p) => p.product_id === value?.product_id
              );
            }),
          quantity: Yup.number()
            .required("الكمية مطلوبة")
            .positive("الكمية يجب أن تكون أكبر من صفر")
            .test(
              "max-quantity",
              "الكمية أكبر من المتاحة",
              function (value: any) {
                const productId = (this?.parent.product_id as InvoiceProduct)
                  .product_id;
                const product = vanProducts.find(
                  (p) => p.product_id === productId
                );
                return value <= (product?.total_quantity || 0);
              }
            ),
          // price: Yup.number()
          //   .required("السعر مطلوب")
          //   .positive("السعر يجب أن يكون أكبر من صفر")
          //   .test(
          //     "match-product-price",
          //     "السعر غير صالح",
          //     function (value: any) {
          //       const productId = (this?.parent.product_id as InvoiceProduct)
          //         .product_id;
          //       const product = vanProducts.find(
          //         (p) => p.product_id === productId
          //       );
          //       return value === (product?.price || 0);
          //     }
          //   ),
        })
      )
      .min(1, "يجب ان يكون هناك منتج واحد على الاقل")
      .test(
        "non-empty-products",
        "المنتجات تحتوي على قيم افتراضية",
        (products: any) =>
          products!.every(
            (product: any) => product.product_id && product.quantity > 0
          )
      ),
  });

  const defaultValues: InvoiceFormData = {
    customer_id: null,
    due_date: null,
    discount: 0,
    products: [
      {
        product_id: "",
        quantity: 0,
        price: 0,
      },
    ],
    van_id: vanDetails?.id,
  };

  const methods = useForm<InvoiceFormData | any>({
    resolver: yupResolver(createInvoiceSchema),
    defaultValues,
  });
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const watchedProducts = watch("products") || [];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const handleAddProduct = () => {
    append({
      product_id: "",
      quantity: 0,
      price: 0,
    });
  };

  const handleRemoveProduct = (index: number) => {
    remove(index);
  };

  const handleGetAllCustomers = () => {
    getAllCustomers().then((res) => {
      if (res && res.data.length) setCustomers(res.data);
    });
  };

  useEffect(() => {
    handleGetAllCustomers();

    dispatch(fetchProducts(vanDetails.id));
  }, [dispatch, vanDetails]);

  useEffect(() => {
    setSelectedProductsDetails(
      watchedProducts.map((product: VanProduct) => {
        const selectedProduct = vanProducts.find(
          (p) => p.product_id === (product.product_id as any)?.product_id
        );
        return {
          ...selectedProduct,
        } as VanProduct;
      })
    );
  }, [
    watchedProducts,
    watchedProducts[watchedProducts.length - 1]?.product_id,
    vanProducts,
  ]);

  const onSubmit = async (data: InvoiceFormData) => {
    const formattedData = {
      ...data,
      customer_id:
        typeof data.customer_id === "string"
          ? data.customer_id
          : data?.customer_id?.id,
      due_date: formatDate(data.due_date || ""),
      products: data.products?.map((product) => ({
        ...product,
        price: product?.product_id?.price,
        product_id: product?.product_id?.product_id,
      })),
    };

    try {
      const res = await createNewInvoice(formattedData);
      if (res.success) {
        showAlert("تمت بنجاح!" + res?.message);

        navigate("/create-payment/" + res?.invoice_id);
      }
    } catch (err) {
      showAlert(" حدث خطأ يرجى المحاولة مرة اخرى!" + `${err}`, {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <Container>
      <Typography variant="h4">انشاء فاتورة جديدة</Typography>

      <SimpleDialog
        open={open}
        onClose={handleClose}
        children={<CreateCustomer />}
      />
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 9 }}>
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
                  <>
                    <FormAutoComplete
                      name="customer_id"
                      control={methods.control}
                      label="العميل"
                      options={customers}
                      getOptionLabel={(option: TypeCustomer) =>
                        option.name || ""
                      }
                      isOptionEqualToValue={(
                        option: TypeCustomer,
                        value: TypeCustomer
                      ) => option.id === value?.id}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "end",
                        justifyContent: "end",
                        mt: 2,
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="info"
                        onClick={handleClickOpen}
                      >
                        اضافة عميل؟
                      </Button>
                    </Box>
                  </>
                  <FormTextField
                    name="invoice_number"
                    control={methods.control}
                    label="ادخال رقم الفاتورة يدويا"
                    helperText="ادخل الرقم يدويا ان كانت الفاتورة قديمة ولا توجد فى النظام او اتركها وسيتم انشاء رقم فاتورة تلقائيا"
                  />

                  <FormDatePicker
                    name="due_date"
                    control={methods.control}
                    label="تاريخ استحقاق الفاتورة"
                  />

                  <FormTextField
                    name="discount"
                    control={methods.control}
                    label="التخفيض"
                  />
                </Box>
                {fields.map((field, index) => {
                  const selectedProduct: VanProduct = watch(
                    `products.${index}.product_id`
                  );
                  const quantity = watch(`products.${index}.quantity`) || 0;

                  console.log("selectedProduct", selectedProduct);

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
                        options={vanProducts}
                        getOptionLabel={(option: VanProduct) =>
                          option.product_name || ""
                        }
                        isOptionEqualToValue={(
                          option: VanProduct,
                          value: VanProduct
                        ) => option.product_id === value?.product_id}
                        // onChange={(e, value) => {
                        //   methods.setValue(
                        //     `products.${index}.product_id`,
                        //     value || ""
                        //   );
                        //   methods.setValue(
                        //     `products.${index}.price`,
                        //     value?.price || 0
                        //   );
                        // }}
                      />
                      <FormTextField
                        name={`products.${index}.quantity`}
                        control={control}
                        label="الكمية"
                        inputProps={{
                          max: selectedProduct?.total_quantity || 0,
                        }}
                      />

                      {/* {selectedProduct?.price && (
                        <FormTextField
                          name={`products.${index}.price`}
                          control={control}
                          label="سعر القطعة"
                          disabled
                          value={selectedProduct?.price || 0}
                        />
                      )} */}
                      {/* selectedProduct?.price>0 && ( 
                        // <TextField
                        //   // name={`products.${index}.price`}
                        //   {...register(`products.${index}.price`)}
                        //   value={selectedProduct?.price || 0}
                        //   label="سعر القطعة"
                        //   error={!!errors?.products}
                        //   variant="outlined"
                        //   disabled
                        // />

                      //   <Controller
                      //     name={`products.${index}.price`}
                      //     control={control}
                      //     render={({ field }) => (
                      //       <TextField
                      //         {...field}
                      //         label="سعر القطعة"
                      //         variant="outlined"
                      //         disabled
                      //         // onChange={(event) => field.onChange(event.target.value)} 
                      //       />
                      //     )}
                      //   />
                      // )}
*/}
                      <Typography
                        sx={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          borderRadius: "4px",
                          marginTop: "8px",
                        }}
                      >
                        سعر القطعة :
                        <Typography
                          component="span"
                          variant="h5"
                          color="secondary"
                        >
                          {selectedProduct?.price}
                        </Typography>
                      </Typography>

                      <Typography
                        sx={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          borderRadius: "4px",
                          marginTop: "8px",
                        }}
                      >
                        المجموع:
                        <Typography
                          component="span"
                          variant="h5"
                          color="secondary"
                        >
                          {selectedProduct?.price && quantity
                            ? quantity * selectedProduct.price
                            : 0}
                        </Typography>
                      </Typography>
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
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                  columnGap={2}
                  mt={2}
                >
                  <Button
                    type="button"
                    variant="contained"
                    color="info"
                    onClick={() => {
                      console.log(
                        "Print",
                        errors,
                        control._getWatch("products")
                      );
                    }}
                  >
                    Print
                  </Button>
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
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 3 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">تفاصيل المنتجات : </Typography>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>اسم المنتج</TableCell>
                    <TableCell align="right">العدد المتاح</TableCell>
                    <TableCell align="right"> سعر الواحدة</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedProductsDetails &&
                    selectedProductsDetails.length &&
                    selectedProductsDetails?.map((row) => (
                      <TableRow
                        key={row.product_id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="right">{row.product_name}</TableCell>
                        <TableCell align="right">
                          {row.total_quantity}
                        </TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default CreateInvoice;
