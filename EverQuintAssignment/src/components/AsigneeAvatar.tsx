import { Avatar, Tooltip } from "@mui/material";

interface AssigneeAvatarProps {
  name: string;
}

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};
const getInitials = (name: string) => {
  const names = name.trim().split(" ");
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name ? name[0].toUpperCase() : "?";
};

export const AssigneeAvatar = ({ name }: AssigneeAvatarProps) => {
  const displayName = name || "Unassigned";
  const avatarColor = name ? stringToColor(name) : "#bdbdbd";

  return (
    <Tooltip title={displayName} arrow>
      <Avatar
        sx={{
          bgcolor: avatarColor,
          width: 32,
          height: 32,
          fontSize: "0.875rem",
          fontWeight: 600,
          boxShadow: "0 0 0 2px #fff",
        }}
      >
        {getInitials(displayName)}
      </Avatar>
    </Tooltip>
  );
};
