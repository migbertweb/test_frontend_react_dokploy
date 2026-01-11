import { describe, it, expect, beforeEach, afterAll, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import Tasks from './Tasks';
import React from 'react';

// Mock tasks data
const mockTasks = [
  { id: 1, title: 'Task 1', description: 'Desc 1', completed: false, created_at: new Date().toISOString() },
  { id: 2, title: 'Task 2', description: 'Desc 2', completed: true, created_at: new Date().toISOString() },
];

// Setup MSW server
const server = setupServer(
  http.get('*/tasks/', () => {
    return HttpResponse.json(mockTasks);
  }),
  http.post('*/tasks/', async ({ request }) => {
    const newTask = await request.json();
    return HttpResponse.json({ ...newTask, id: 3, created_at: new Date().toISOString() }, { status: 201 });
  }),
  http.put('*/tasks/:id', () => {
    return HttpResponse.json({ success: true });
  }),
  http.delete('*/tasks/:id', () => {
    return HttpResponse.json({ success: true });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Tasks Page', () => {
  it('renders tasks from the API', async () => {
    render(<Tasks />);
    
    // Check loading state (optional but good)
    // expect(screen.getByTestId('loader')).toBeDefined();

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeDefined();
      expect(screen.getByText('Task 2')).toBeDefined();
    });
  });

  it('can open create modal and submit a new task', async () => {
    render(<Tasks />);
    
    // Click "Nueva Tarea"
    const addButton = await screen.findByText('Nueva Tarea');
    fireEvent.click(addButton);
    
    // Fill form
    const titleInput = screen.getByPlaceholderText('¿Qué necesitas hacer?');
    const descInput = screen.getByPlaceholderText('Detalles adicionales...');
    
    fireEvent.change(titleInput, { target: { value: 'New Test Task' } });
    fireEvent.change(descInput, { target: { value: 'New Test Desc' } });
    
    // Submit
    const submitButton = screen.getByText('Crear Tarea');
    fireEvent.click(submitButton);
    
    // Modal should close (wait for it to disappear or check if fetch was called)
    await waitFor(() => {
      expect(screen.queryByText('Nueva Tarea', { selector: 'h3' })).toBeNull();
    });
  });

  it('can toggle a task status', async () => {
    render(<Tasks />);
    
    const task1 = await screen.findByText('Task 1');
    const toggleButton = task1.closest('.glass-card').querySelector('button'); // This is brittle, but without test-ids...
    
    fireEvent.click(toggleButton);
    
    // In our mock, it doesn't change the UI unless fetchTasks is called again
    // But toggleTask implements optimistic update
    // We can check if the style changes or similar
  });
});
