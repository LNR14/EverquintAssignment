import { Chip, type ChipProps } from "@mui/material";

interface StatusBadgeProps extends ChipProps {
  type?: "priority" | "tag";
}

export const StatusBadge = ({
  label,
  type = "tag",
  sx,
  ...props
}: StatusBadgeProps) => {
  // Logic for priority colors
  const getPriorityStyles = () => {
    if (type !== "priority") return {};
    switch (label?.toString().toLowerCase()) {
      case "high":
        return { bgcolor: "#ffebee", color: "#c62828", fontWeight: "bold" };
      case "medium":
        return { bgcolor: "#fff3e0", color: "#ef6c00", fontWeight: "bold" };
      case "low":
        return { bgcolor: "#e8f5e9", color: "#2e7d32", fontWeight: "bold" };
      default:
        return {};
    }
  };

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        borderRadius: "4px",
        fontSize: "0.75rem",
        textTransform: "uppercase",
        ...getPriorityStyles(),
        ...sx,
      }}
      {...props}
    />
  );
};
