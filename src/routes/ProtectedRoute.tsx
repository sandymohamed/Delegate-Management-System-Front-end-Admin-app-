import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Box, CircularProgress, Container, Stack } from "@mui/material";

// ------------------------------------------------------------
type TypeProtectedRoute = {
  children: React.ReactElement;
};
// ------------------------------------------------------------

const ProtectedRoute: React.FC<TypeProtectedRoute> = ({ children }) => {
  const { token, loading, user, fetchUserData } = useAuth();

  useEffect(() => {
    if (token && !user) {
      fetchUserData(); // Ensure user data is fetched if token exists
    }
  }, [token, user]);

  if (loading) {
    return (
      <Stack
        sx={{
          height: "100vh",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        spacing={2}
      >
        <CircularProgress color="secondary" />
      </Stack>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return children;
};

export default ProtectedRoute;
