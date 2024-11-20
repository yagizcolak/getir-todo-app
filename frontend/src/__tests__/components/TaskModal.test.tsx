// src/components/TaskModal.test.tsx

import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { render } from '../../test-utils';
import TaskModal from '../../components/tasks/TaskModal';
import { TaskStatus, TaskCategory } from '../../constants';

describe('TaskModal Component', () => {
  const initialValues = {
    title: '',
    status: 'pending' as TaskStatus,
    category: 'Work' as TaskCategory,
    deadline: null,
  };

  it('renders the modal when open', () => {
    render(
        <TaskModal
          open={true}
          onClose={jest.fn()}
          initialValues={initialValues}
          isEditMode={false}
        />
    );

    expect(screen.getByText('Add a New Task')).toBeInTheDocument();
  });

  it('validates the form and shows errors', async () => {
    render(
        <TaskModal
          open={true}
          onClose={jest.fn()}
          initialValues={initialValues}
          isEditMode={false}
        />
    );

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: '' } });
    fireEvent.click(screen.getByText('Add Task'));

    expect(await screen.findByText('Title is required')).toBeInTheDocument();
  });
});