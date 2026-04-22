import { useState, useEffect } from "react";
import {
  Stack,
  TextField,
  MenuItem,
  Box,
  Autocomplete,
  Chip,
  Button,
  DialogActions,
} from "@mui/material";
import { addTask, updateTask, deleteTask, type Task } from "../services/db";

interface TaskFormProps {
  initialData?: Task | null;
  onSave: () => void;
  onClose: () => void;
}

export const TaskForm = ({ initialData, onSave, onClose }: TaskFormProps) => {
  const [formData, setFormData] = useState<Partial<Task>>(
    initialData || {
      title: "",
      description: "",
      status: "Backlog",
      priority: "Medium",
      assignee: "",
      tags: [],
    }
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isDirty, setIsDirty] = useState(false);

  // Requirement 2.2: "Dirty" state handling
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = ""; // Shows browser confirmation
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleChange = (field: keyof Task, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title?.trim()) newErrors.title = "Title is required";
    if (formData.title && formData.title.length > 50)
      newErrors.title = "Too long";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    if (initialData?.id) {
      await updateTask({ ...initialData, ...formData } as Task);
    } else {
      await addTask(formData as Omit<Task, "id">);
    }

    setIsDirty(false);
    onSave();
    onClose();
  };

  return (
    <Stack spacing={3} sx={{ pt: 1 }}>
      <TextField
        label="Task Title"
        fullWidth
        error={!!errors.title}
        helperText={errors.title}
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />
      <TextField
        label="Description"
        multiline
        rows={4}
        fullWidth
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />
      <Stack direction="row" spacing={2}>
        <TextField
          select
          label="Status"
          fullWidth
          value={formData.status}
          onChange={(e) => handleChange("status", e.target.value)}
        >
          <MenuItem value="Backlog">Backlog</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </TextField>

        <TextField
          select
          label="Priority"
          fullWidth
          value={formData.priority}
          onChange={(e) => handleChange("priority", e.target.value)}
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </TextField>
      </Stack>
      <TextField
        label="Assignee"
        fullWidth
        value={formData.assignee}
        onChange={(e) => handleChange("assignee", e.target.value)}
      />
      <Autocomplete
        multiple
        options={[]} // Add suggestions here if wanted
        freeSolo
        value={formData.tags}
        onChange={(_, newValue) => handleChange("tags", newValue)}
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
              size="small"
            />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} label="Tags" placeholder="Press Enter" />
        )}
      />
      <DialogActions
        sx={{
          px: 0,
          pt: 3,
          mt: 2,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        {initialData?.id && (
          <Button
            color="error"
            size="small"
            variant="text"
            sx={{
              mr: "auto",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { bgcolor: "#ffebee" },
            }}
            onClick={async () => {
              if (confirm("Delete this task?")) {
                await deleteTask(initialData.id!);
                onSave();
                onClose();
              }
            }}
          >
            Delete Task
          </Button>
        )}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Button
            onClick={onClose}
            variant="contained"
            disableElevation
            sx={{
              bgcolor: "#F4F5F7", // Soft grey background
              color: "#42526E", // Darker slate text for readability
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.875rem",
              px: 2,
              py: 0.6,
              "&:hover": {
                bgcolor: "#EBECF0", // Slightly darker on hover
                boxShadow: "none",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            variant="contained"
            disableElevation
            sx={{
              bgcolor: "#0052CC", // Jira Blue
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.875rem",
              px: 2,
              py: 0.6,
              "&:hover": {
                bgcolor: "#0747A6",
                boxShadow: "none",
              },
            }}
          >
            Save
          </Button>
        </Box>
      </DialogActions>
    </Stack>
  );
};
