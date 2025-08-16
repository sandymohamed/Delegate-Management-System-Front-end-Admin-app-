import React, { useEffect } from "react";
import { Drawer, Link, List, ListItem, Stack } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Iconify from "../components/iconify/Iconify";
import { icons } from "../components/iconify/IconRegistry";

// ------------------------------------------------------------------------
type TypeLink = {
  title: string;
  path: string;
  icon: string;
};

// ------------------------------------------------------------------------
const LINKS: TypeLink[] = [
  {
    title: "الرئيسية",
    path: "/",
    icon: icons.files,
  },
  {
    title: "الشاحنة",
    path: "/van",
    icon: icons.files,
  },
  {
    title: "المنتجات",
    path: "/products",
    icon: icons.files,
  },
  {
    title: "المرتجعات",
    path: "/products/returned",
    icon: icons.files,
  },
  // {
  //   title: "الموردين",
  //   path: "/suppliers",
  //   icon: icons.files,
  // },
  {
    title: "الفواتير",
    path: "/invoices",
    icon: icons.files,
  },
  {
    title: "انشاء فاتورة جديدة",
    path: "/create-invoice",
    icon: icons.files,
  },
  {
    title: "العملاء",
    path: "/customers",
    icon: icons.files,
  },
  {
    title: "اضافة عميل",
    path: "/create-customer",
    icon: icons.files,
  },
  {
    title: "تسديد مبلغ",
    path: "/create-payment",
    icon: icons.files,
  },
  {
    title: "مركز المدفوعات",
    path: "/payment-center",
    icon: icons.price,
  },
];

type TypeNavbarPropd = {
  openNav: boolean;
  handleCloseNav: () => void;
};

const Navbar: React.FC<TypeNavbarPropd> = ({ openNav, handleCloseNav }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (openNav) {
      handleCloseNav();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={openNav}
      onClose={handleCloseNav}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        sx: {
          width: "15rem",
          backgroundColor: "secondary.main",
        },
      }}
    >
      <Stack
        spacing={4}
        alignItems="center"
        justifyContent="center"
        py={2}
        height="100%"
      >
        <img
          src="https://i.ibb.co/0jY7b2D/logo.png"
          alt="logo"
          width={100}
          height={100}
        />
        <Stack
          spacing={4}
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <List>
            {LINKS.map((link: TypeLink) => (
              <ListItem key={link.title} sx={{ fontSize: "1.2rem", my: 2 }}>
                <Link
                  component={RouterLink}
                  to={link.path}
                  underline="none"
                  color="white"
                >
                  <Iconify icon={link.icon} /> {link.title}
                </Link>
              </ListItem>
            ))}
          </List>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default Navbar;
