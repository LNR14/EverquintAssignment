import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Stack, Typography, Button, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";

import { FilterBar } from "../components/FilterBar";
import { BoardColumn } from "../components/BoardColumn";
import { TaskModal } from "../components/TaskModal";
import { TaskForm } from "../components/TaskForm";
import { getAllTasks, updateTask } from "../services/db";

export const TeamWorkflow = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const filters = {
    search: searchParams.get("search") || "",
    priority: searchParams.get("priority") || "All",
  };

  const handleFilterChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (!value || value === "All") newParams.delete(key);
    else newParams.set(key, value);
    setSearchParams(newParams);
  };

  const refreshTasks = async () => {
    const data = await getAllTasks();
    setTasks(data);
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((t) => {
        const matchesSearch = t.title
          .toLowerCase()
          .includes(filters.search.toLowerCase());
        const matchesPriority =
          filters.priority === "All" || t.priority === filters.priority;
        return matchesSearch && matchesPriority;
      })
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
  }, [tasks, filters]);
  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const taskId = parseInt(draggableId);
    const task = tasks.find((t) => t.id === taskId);

    if (task) {
      const updatedTask = {
        ...task,
        status: destination.droppableId as any,
        updatedAt: new Date().toISOString(),
      };

      await updateTask(updatedTask);

      refreshTasks();
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{ py: 4, bgcolor: "#F4F5F7", minHeight: "100vh" }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" fontWeight="700" color="text.primary">
          Team Board
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingTask(null);
            setIsModalOpen(true);
          }}
        >
          Create Task
        </Button>
      </Box>

      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      <DragDropContext onDragEnd={onDragEnd}>
        <Stack
          direction="row"
          spacing={3}
          sx={{ mt: 4, alignItems: "flex-start" }}
        >
          {["Backlog", "In Progress", "Done"].map((status) => (
            <BoardColumn
              key={status}
              title={status}
              tasks={filteredTasks.filter((t) => t.status === status)}
              onEditTask={(task) => {
                setEditingTask(task);
                setIsModalOpen(true);
              }}
            />
          ))}
        </Stack>
      </DragDropContext>

      <TaskModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTask ? "Edit Task" : "Create New Task"}
      >
        <TaskForm
          initialData={editingTask}
          onSave={refreshTasks}
          onClose={() => setIsModalOpen(false)}
        />
      </TaskModal>
    </Container>
  );
};

export default TeamWorkflow;
