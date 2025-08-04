import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Button,
  Popover,
} from "@mui/material";
// routes
// import { PATH_DASHBOARD, PATH_AUTH } from '../../../routes/paths';
// auth
import { useAuth } from "../context/AuthContext";
import { useAlert } from "../context/AlertProvider";
// components
// import { CustomAvatar } from "../components/index";

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: "Home",
    linkTo: "/",
  },
  {
    label: "Settings",
    linkTo: "/",
  },
];

// ----------------------------------------------------------------------

const AccountPopover: React.FC = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { showAlert } = useAlert();

  // const { enqueueSnackbar } = useSnackbar();

  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenPopover = (event: any) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  const handleLogout = async () => {
    try {
      logout();
      // navigate(PATH_AUTH.login, { replace: true });
      handleClosePopover();
    } catch (error) {
      console.error(error);
      showAlert(" حدث خطأ يرجى المحاولة مرة اخرى!", {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const handleClickItem = (path: string) => {
    handleClosePopover();
    navigate(path);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpenPopover}>
        {user?.name ?? ""}
      </Button>

      <Popover
        open={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ my: 5.0, px: 3.0 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleClickItem(option.linkTo)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
};

export default AccountPopover;
