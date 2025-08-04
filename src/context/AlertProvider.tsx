import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  Alert,
  AlertColor,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";

type AlertOptions = {
  severity?: AlertColor;
  variant?: "outlined" | "standard" | "filled";
  autoHideDuration?: number;
};

type AlertContextType = {
  showAlert: (message: string, options?: AlertOptions) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

type AlertProviderProps = {
  children: ReactNode;
};
export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alertState, setAlertState] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
    variant: "outlined" | "standard" | "filled";
    autoHideDuration: number;
  }>({
    open: false,
    message: "",
    severity: "success",
    variant: "filled",
    autoHideDuration: 6000,
  });

  const showAlert = (message: string, options: AlertOptions = {}) => {
    setAlertState({
      open: true,
      message,
      severity: options.severity || "success",
      variant: options.variant || "filled",
      autoHideDuration: options.autoHideDuration || 6000,
    });
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
    setAlertState((prev) => ({ ...prev, open: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        open={alertState.open}
        autoHideDuration={alertState.autoHideDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={(e) => handleClose(e, "timeout")}
          severity={alertState.severity}
          variant={alertState.variant}
          sx={{ width: "100%" }}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
