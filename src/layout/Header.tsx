import React, { useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import AccountPopover from "./AccountPopover";
import { useAuth } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchVan } from "../redux/slices/vanSlice";
import { AppDispatch, RootState } from "../redux/store";
import { Van } from "../types/Van";
// ----------------------------------------------------------------------------
const Header: React.FC = () => {
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const vanDetails: Van | null = useSelector(
    (state: RootState) => state.van.vanDetails
  );

  useEffect(() => {
    if (user) dispatch(fetchVan(user?.id));
  }, [dispatch, user?.id]);

  return (
    <Stack
      spacing={2}
      direction="row"
      alignContent="center"
      justifyContent="space-between"
      sx={{ backgroundColor: "secondary.main", p: 2, color: "white" }}
    >
      <Typography>Logo goes here!</Typography>
      <Typography>{vanDetails?.name}</Typography>

      <AccountPopover />
    </Stack>
  );
};

export default Header;
