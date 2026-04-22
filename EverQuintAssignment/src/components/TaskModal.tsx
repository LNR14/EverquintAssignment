import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isDirty?: boolean;
}

export const TaskModal = ({
  open,
  onClose,
  title,
  children,
  isDirty,
}: TaskModalProps) => {
  const handleClose = () => {
    if (isDirty && !window.confirm("You have unsaved changes. Close anyway?")) {
      return;
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="task-modal-title"
    >
      <DialogTitle
        id="task-modal-title"
        sx={{ m: 0, p: 2, fontWeight: "bold" }}
      >
        {title}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};
