import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import { StatusBadge } from "./StatusBadge";
import { AssigneeAvatar } from "./AsigneeAvatar";
import { formatDistanceToNow } from "date-fns";

export const TaskCard = ({
  task,
  onClick,
}: {
  task: any;
  onClick: () => void;
}) => {
  return (
    <Card
      variant="outlined"
      onClick={onClick}
      sx={{
        cursor: "pointer",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
        transition: "all 0.2s ease-in-out",
        mb: 1.5,
      }}
    >
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Stack spacing={1}>
          <Box
            display={"flex" as const}
            justifyContent="space-between"
            alignItems="start"
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, lineHeight: 1.2 }}
            >
              {task.title}
            </Typography>
            <StatusBadge label={task.priority} type="priority" />
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {task.description}
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={0.5}>
            {task.tags.map((tag: string) => (
              <StatusBadge key={tag} label={tag} />
            ))}
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pt={1}
          >
            <Typography variant="caption" color="text.disabled">
              {formatDistanceToNow(new Date(task.updatedAt), {
                addSuffix: true,
              })}
            </Typography>
            <AssigneeAvatar name={task.assignee} />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
