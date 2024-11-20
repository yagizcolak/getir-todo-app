// src/components/TaskItem.tsx

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CardMedia,
  CardMediaProps,
  Box,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { motion } from 'framer-motion';

import { Task } from '../../types/tasks';
import { useAppDispatch } from '../../hooks';
import { deleteTask } from '../../slices';
import { categoryImages } from '../../assets';
import { STATUS_COLORS, STATUS_ICONS } from '../../constants';
import { useNotification } from '../../contexts/NotificationContext';
import { getRemainingDays } from '../../utils/dateUtils';

import { styled } from '@mui/material/styles';

// Create a MotionCard component
const MotionCard = motion.create(
  React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Card>>((props, ref) => (
    <Card ref={ref} {...props} />
  ))
);

// Styled Components
const StyledCard = styled(MotionCard)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  paddingBottom: 0,
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
}));

const CategoryImageBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  paddingTop: '100%', // 1:1 Aspect Ratio
  overflow: 'hidden',
}));

const StyledCardMedia = styled(CardMedia)<CardMediaProps<'img'>>(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
}));

const StatusCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2, 2, 0, 2),
}));

const StatusContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const StatusInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const StatusText = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const RemainingDaysTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const ActionButtons = styled(CardActions)(({ theme }) => ({
  justifyContent: 'center',
}));

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
  const dispatch = useAppDispatch();
  const { showNotification } = useNotification();
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);

  const handleDeleteClick = () => {
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteTask(task._id)).unwrap();
      showNotification('Task deleted successfully.', 'success');
    } catch (error: any) {
      showNotification(
        error.message || 'Failed to delete task. Please try again.',
        'error'
      );
    }
    setOpenConfirmDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const remainingDays = getRemainingDays(task.deadline);
  const StatusIcon = STATUS_ICONS[task.status];

  return (
    <>
      <StyledCard
        sx={{ backgroundColor: STATUS_COLORS[task.status] }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        {/* Title */}
        <StyledCardContent>
          <Tooltip title={task.title} arrow>
            <TitleTypography variant="h6" noWrap>
              {task.title}
            </TitleTypography>
          </Tooltip>
        </StyledCardContent>

        {/* Category Image */}
        <CategoryImageBox>
          <StyledCardMedia
            component="img"
            image={categoryImages[task.category]}
            alt={task.category}
          />
        </CategoryImageBox>

        {/* Status and Remaining Days */}
        <StatusCardContent>
          <StatusContainer>
            <StatusInfo>
              <StatusIcon fontSize="small" />
              <StatusText variant="body2">
                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </StatusText>
            </StatusInfo>
            <RemainingDaysTypography variant="body2">
              {remainingDays}
            </RemainingDaysTypography>
          </StatusContainer>
        </StatusCardContent>

        {/* Edit and Delete Buttons at Bottom Center */}
        <ActionButtons>
          <Button size="small" startIcon={<Edit />} onClick={handleEdit}>
            Edit
          </Button>
          <Button size="small" startIcon={<Delete />} onClick={handleDeleteClick}>
            Delete
          </Button>
        </ActionButtons>
      </StyledCard>

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCancelDelete}
        aria-labelledby="confirm-delete-dialog"
      >
        <DialogTitle id="confirm-delete-dialog">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the task "{task.title}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskItem;