/**
 * Author: Migbert Yanez
 * GitHub: https://github.com/migbertweb
 * Description: Página de gestión de tareas.
 * Permite listar, crear, editar, eliminar y marcar tareas como completadas.
 * Utiliza React Query para el manejo de estado del servidor y optimismo en la UI.
 */
import React, { useState, useEffect } from 'react';
import client from '../api/client';
import { Plus, CheckCircle, Circle, Trash2, Calendar, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [creating, setCreating] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // Estado para la tarea que se está editando

  // Obtener tareas del servidor
  const fetchTasks = async () => {
    try {
      const response = await client.get('/tasks/');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const taskData = {
        title: newTaskTitle,
        description: newTaskDesc,
        completed: false
      };
      await client.post('/tasks/', taskData);
      setNewTaskTitle('');
      setNewTaskDesc('');
      setIsModalOpen(false);
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setCreating(false);
    }
  };

  const toggleTask = async (task) => {
    // Optimistic update
    const originalTasks = [...tasks];
    setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));

    try {
      await client.put(`/tasks/${task.id}`, { completed: !task.completed });
    } catch (error) {
      // Revert on error
      console.error('Error updating task:', error);
      setTasks(originalTasks);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta tarea?')) return;
    
    // Optimistic update
    const originalTasks = [...tasks];
    setTasks(tasks.filter(t => t.id !== id));

    try {
      await client.delete(`/tasks/${id}`);
    } catch (error) {
      console.error('Error deleting task:', error);
      setTasks(originalTasks);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Mis Tareas</h2>
          <p className="text-gray-500 dark:text-gray-400">Gestiona tus actividades diarias</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Nueva Tarea
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-primary-500" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={clsx(
                  "glass-card p-6 rounded-xl relative group overflow-hidden border-l-4",
                  task.completed ? "border-l-green-500 opacity-75" : "border-l-primary-500"
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="pr-8">
                    <h3 className={clsx("text-lg font-semibold mb-1", task.completed && "line-through text-gray-500")}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {task.description || "Sin descripción"}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleTask(task)}
                    className={clsx(
                      "transition-colors duration-200",
                      task.completed ? "text-green-500 hover:text-green-600" : "text-gray-300 hover:text-primary-500"
                    )}
                  >
                    {task.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
                  </button>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50">
                  <div className="flex items-center text-xs text-gray-400 gap-1">
                    <Calendar size={14} />
                    {new Date(task.created_at).toLocaleDateString()}
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors bg-transparent opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-200"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {tasks.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-400">
              <div className="mb-4 inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                <CheckCircle size={40} className="text-gray-300 dark:text-gray-600" />
              </div>
              <p>No tienes tareas pendientes. ¡Buen trabajo!</p>
            </div>
          )}
        </div>
      )}

      {/* Create Task Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="glass w-full max-w-lg rounded-2xl p-6 shadow-2xl"
            >
              <h3 className="text-xl font-bold mb-4 dark:text-white">Nueva Tarea</h3>
              <form onSubmit={handleCreateTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">Título</label>
                  <input
                    type="text"
                    required
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="input-field"
                    placeholder="¿Qué necesitas hacer?"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">Descripción</label>
                  <textarea
                    value={newTaskDesc}
                    onChange={(e) => setNewTaskDesc(e.target.value)}
                    className="input-field min-h-[100px]"
                    placeholder="Detalles adicionales..."
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-secondary"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="btn-primary flex items-center gap-2"
                  >
                    {creating && <Loader2 className="animate-spin" size={16} />}
                    Crear Tarea
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tasks;
