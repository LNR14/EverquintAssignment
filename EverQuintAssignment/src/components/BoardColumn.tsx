import { Paper, Typography, Stack, Box } from "@mui/material";
import { TaskCard } from "./TaskCard";
import { type Task } from "../services/db";
import { Droppable, Draggable } from "@hello-pangea/dnd";

interface BoardColumnProps {
  title: string;
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

export const BoardColumn = ({ title, tasks, onEditTask }: BoardColumnProps) => {
  return (
    <Droppable droppableId={title}>
      {(provided, snapshot) => (
        <Paper
          elevation={0}
          {...provided.droppableProps}
          ref={provided.innerRef}
          sx={{
            width: 350,
            minHeight: "70vh",
            bgcolor: snapshot.isDraggingOver ? "#E2E4E9" : "#EBECF0",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            transition: "background-color 0.2s ease",
          }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                color: "#5E6C84",
                textTransform: "uppercase",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="caption"
              sx={{ bgcolor: "#DFE1E6", px: 1, borderRadius: 1 }}
            >
              {tasks.length}
            </Typography>
          </Box>
          <Stack
            spacing={1.5}
            sx={{
              p: 1.5,
              flexGrow: 1,
              overflowY: "auto",
              maxHeight: "calc(100vh - 250px)",
              minHeight: "100px",
            }}
          >
            {tasks.length === 0 ? (
              <Typography
                variant="body2"
                color="text.disabled"
                align="center"
                sx={{ mt: 4 }}
              >
                No tasks yet
              </Typography>
            ) : (
              tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id?.toString() || ""}
                  index={index}
                >
                  {(dragProvided, dragSnapshot) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                      style={{
                        ...dragProvided.draggableProps.style,
                        opacity: dragSnapshot.isDragging ? 0.9 : 1,
                      }}
                    >
                      <TaskCard task={task} onClick={() => onEditTask(task)} />
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </Stack>
        </Paper>
      )}
    </Droppable>
  );
};
