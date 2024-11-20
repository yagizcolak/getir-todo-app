// routes/taskRoutes.ts

import { Router, Request, Response } from 'express';
import Task, { ITask } from '../models/Task';

const router = Router();

/**
 * GET /api/tasks
 * Retrieve all tasks from the database.
 */
router.get('/tasks', async (req: Request, res: Response) => {
  try {
    const tasks: ITask[] = await Task.find().sort({ createdAt: -1 }); // Fetch all tasks, newest item first
    res.status(200).json(tasks); // Return the tasks with a 200 OK status
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'An unknown error occurred.',
    });
  }
});

/**
 * GET /api/tasks/:id
 * Retrieve a task by its ID.
 */
router.get('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id); // Find the task by ID

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
    } else {
      res.status(200).json(task); // Return the found task
    }
    
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'An unknown error occurred.',
    });
  }
});

/**
 * POST /api/tasks
 * Create a new task.
 */
router.post('/tasks', async (req: Request, res: Response) => {
  const { title, status, category, deadline } = req.body;
  const task = new Task({
    title,
    status,
    category,
    deadline: deadline ? new Date(deadline) : null,
  });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'An unknown error occurred.',
    });
  }
});

/**
 * PUT /api/tasks/:id
 * Update a task's status and title.
 */
router.put('/tasks/:id', async (req: Request, res: Response) => {
  const { title, status, category, deadline } = req.body;

  try {
    // Build the update object dynamically
    const update: Partial<ITask> = {};
    if (title !== undefined) update.title = title;
    if (status !== undefined) update.status = status;
    if (category !== undefined) update.category = category;
    if (deadline !== undefined) {
      if (deadline === null) {
        update.deadline = null;
      } else {
        update.deadline = new Date(deadline);
      }
    }

    // Update the task and return the updated document
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );

    if (!updatedTask) throw new Error('Task not found');

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'An unknown error occurred.',
    });
  }
});

/**
 * DELETE /api/tasks/:id
 * Delete a task.
 */
router.delete('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id); // Delete the task by ID

    if (!deletedTask) throw new Error('Task not found');

    res.status(200).json({ message: 'Task deleted', task: deletedTask }); // Confirm deletion
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'An unknown error occurred.',
    });
  }
});

export default router;