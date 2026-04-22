import {
  Stack,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const FilterBar = ({ filters, onFilterChange }: any) => {
  return (
    <Box
      sx={{
        bgcolor: "white",
        p: 2,
        borderRadius: 1,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          placeholder="Search tasks..."
          size="small"
          fullWidth
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ color: "action.active", mr: 1 }} />
            ),
          }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            label="Priority"
            value={filters.priority}
            onChange={(e) => onFilterChange("priority", e.target.value)}
          >
            <MenuItem value="All">All Priorities</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};
