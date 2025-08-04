import * as React from "react";
import { Navigate, useRoutes } from "react-router";
import {
  Login,
  Dashboard,
  VanTrack,
  VansList,
  CreateInvoice,
  AgentInvoices,
  InvoiceDetails,
  CustomersList,
  CustomerInvoices,
  CreateCustomer,
  ProductsList,
  ReturnedProductsList,
  AddPayment,
  CreateProduct,
  CreateVan,
} from "./elements";
import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

const Router: React.FC = () => {
  return useRoutes([
    { path: "/login", element: <Login /> },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        { element: <Navigate to="/dashboard" replace />, index: true },
        { path: "/dashboard", element: <Dashboard /> },
        // TODO: update this to get van id from each row in table vansList
        // { path: "/van", element: <VanTrack /> },
        { path: "/create-invoice", element: <CreateInvoice /> },
        { path: "/invoices", element: <AgentInvoices /> },
        { path: "/invoice/:id", element: <InvoiceDetails /> },
        { path: "/customers", element: <CustomersList /> },
        { path: "/customer-invoices/:id", element: <CustomerInvoices /> },
        { path: "/create-customer", element: <CreateCustomer /> },
        { path: "/create-payment/:invoice_id", element: <AddPayment /> },

        {
          path: "/products",
          // element: <ProductsList />,
          children: [
            { element: <Navigate to="/products/list" replace />, index: true },
            { path: "/products/list", element: <ProductsList /> },
            { path: "/products/returned", element: <ReturnedProductsList /> },
            { path: "/products/create-product", element: <CreateProduct /> },
            { path: "/products/edit-product", element: <CreateProduct /> },
          ],
        },
        {
          path: "/vans",
          children: [
            { path: "/vans/van/:vanId", element: <VanTrack /> },
            { element: <Navigate to="/vans/list" replace />, index: true },
            { path: "/vans/list", element: <VansList /> },
            { path: "/vans/create-van", element: <CreateVan /> },
          ],
        },
      ],
    },
    { path: "*", element: <>Page 404</> },
  ]);
};

export default Router;
