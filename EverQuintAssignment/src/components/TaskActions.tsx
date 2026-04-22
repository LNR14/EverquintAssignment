import { IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const TaskActions = ({ onEdit, onDelete }) => (
  <Stack direction="row" spacing={1}>
    <IconButton aria-label="edit task" onClick={onEdit} size="small">
      <EditIcon fontSize="small" color="primary" />
    </IconButton>

    <IconButton aria-label="delete task" onClick={onDelete} size="small">
      <DeleteIcon fontSize="small" color="error" />
    </IconButton>
  </Stack>
);
