import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

// ----------------------------------------------------------------------
export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title?: string | null;
}
// ----------------------------------------------------------------------

const SimpleDialog: React.FC<SimpleDialogProps> = (props) => {
  const { onClose, open, children, title } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="lg" >
      <DialogTitle>{title ? title : ""}</DialogTitle>
      {children}
    </Dialog>
  );
};

export default SimpleDialog;
