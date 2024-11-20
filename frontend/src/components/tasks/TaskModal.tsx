// src/components/TaskModal.tsx

import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Stack,
} from "@mui/material";
import { useAppDispatch } from "../../hooks";
import { addTask, updateTask } from "../../slices";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
import {
  TaskStatus,
  TASK_STATUSES,
  TaskCategory,
  TASK_CATEGORIES,
} from "../../constants";
import { useNotification } from "../../contexts/NotificationContext";
import { DatePicker } from "@mui/x-date-pickers";
import { styled } from "@mui/material/styles"; // Import styled from MUI

// Styled Components

const StyledModalBox = styled(Box)(({ theme }) => ({
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(3, 4),
}));

const ModalTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

interface FormValues {
  title: string;
  status: TaskStatus;
  category: TaskCategory;
  deadline: Date | null;
}

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  initialValues: FormValues;
  isEditMode: boolean;
  taskId?: string; // Required if isEditMode is true
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  status: Yup.mixed<TaskStatus>().oneOf(TASK_STATUSES).notRequired(),
  category: Yup.mixed<TaskCategory>()
    .oneOf(TASK_CATEGORIES)
    .required("Category is required"),
  deadline: Yup.date().nullable(),
});

const TaskModal: React.FC<TaskModalProps> = ({
  open,
  onClose,
  initialValues,
  isEditMode,
  taskId,
}) => {
  const dispatch = useAppDispatch();
  const { showNotification } = useNotification();

  const handleSubmit = async (values: FormValues) => {
    const data = {
      ...values,
      deadline: values.deadline ? format(values.deadline, "yyyy-MM-dd") : null,
    };

    try {
      if (isEditMode && taskId) {
        await dispatch(updateTask({ id: taskId, updates: data })).unwrap();
        showNotification("Task updated successfully.", "success");
      } else {
        await dispatch(addTask(data)).unwrap();
        showNotification("Task created successfully.", "success");
      }
      onClose();
    } catch (error: any) {
      showNotification(
        error.message || "An error occurred. Please try again.",
        "error"
      );
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="task-modal-title"
      aria-describedby="task-modal-description"
    >
      <StyledModalBox>
        <ModalTitle id="task-modal-title" variant="h5">
          {isEditMode ? "Edit Task" : "Add a New Task"}
        </ModalTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched, handleChange, values, setFieldValue }) => (
            <Form>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
                  variant="outlined"
                  value={values.title}
                  onChange={handleChange}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  inputProps={{
                    maxLength: 60,
                  }}
                />

                <FormControl fullWidth variant="outlined">
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    name="category"
                    label="Category"
                    value={values.category}
                    onChange={handleChange}
                    error={touched.category && Boolean(errors.category)}
                  >
                    {TASK_CATEGORIES.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.category && errors.category && (
                    <Typography color="error" variant="caption">
                      {errors.category}
                    </Typography>
                  )}
                </FormControl>

                <FormControl fullWidth variant="outlined">
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status"
                    name="status"
                    label="Status"
                    value={values.status}
                    onChange={handleChange}
                    error={touched.status && Boolean(errors.status)}
                  >
                    {TASK_STATUSES.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.status && errors.status && (
                    <Typography color="error" variant="caption">
                      {errors.status}
                    </Typography>
                  )}
                </FormControl>

                <DatePicker
                  label="Deadline"
                  value={values.deadline}
                  onChange={(value) => {
                    setFieldValue("deadline", value);
                  }}
                  slotProps={{
                    field: {
                      clearable: true,
                    },
                    textField: {
                      fullWidth: true,
                      error: touched.deadline && Boolean(errors.deadline),
                      helperText: touched.deadline && errors.deadline,
                    },
                  }}
                />

                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  size="large"
                  data-testid="modal-add-task-button"
                >
                  {isEditMode ? "Update Task" : "Add Task"}
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </StyledModalBox>
    </Modal>
  );
};

export default TaskModal;
