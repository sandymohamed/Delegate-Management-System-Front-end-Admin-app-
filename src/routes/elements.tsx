import { lazy, Suspense, ComponentType } from "react";
import { LinearProgress } from "@mui/material";


const Loadable = (Component: ComponentType<any>) => (props: any) => {
    return (
        <Suspense fallback={<LinearProgress />} >
            <Component {...props} />
        </Suspense>
    );
};
// --------------------------------------
export const Login = Loadable(lazy(() => import('../pages/Login')));
export const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));

export const CreateVan = Loadable(lazy(() => import('../pages/CreateVan')));
export const VanTrack = Loadable(lazy(() => import('../pages/VanTrack')));
export const VansList = Loadable(lazy(() => import('../pages/VansList')));

export const CreateInvoice = Loadable(lazy(() => import('../pages/CreateInvoice')));
export const AgentInvoices = Loadable(lazy(() => import('../pages/AgentInvoices')));
export const InvoiceDetails = Loadable(lazy(() => import('../pages/InvoiceDetails')));
export const CustomersList = Loadable(lazy(() => import('../pages/CustomersList')));
export const CustomerInvoices = Loadable(lazy(() => import('../pages/CustomerInvoices')));
export const CreateCustomer = Loadable(lazy(() => import('../pages/CreateCustomer')));
export const ProductsList = Loadable(lazy(() => import('../pages/ProductsList')));
export const ReturnedProductsList = Loadable(lazy(() => import('../pages/ReturnedProductsList')));
export const AddPayment = Loadable(lazy(() => import('../pages/AddPayment')));
export const CreateProduct = Loadable(lazy(() => import('../pages/CreateProduct')));
