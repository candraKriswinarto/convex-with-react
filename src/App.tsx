import { useState } from "react";
import Header from "./components/header"
import TaskCard from "./components/task-card"
import TaskModal from "./components/task-modal"
import { FormData, Task } from "./types";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
  });

  const tasks = useQuery(api.tasks.getTasks) || [];
  const addTask = useMutation(api.tasks.addTask);
  const updateTask = useMutation(api.tasks.updateTask);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTask) {
      await updateTask({
        id: selectedTask._id,
        title: formData.title,
        description: formData.description,
      });
    } else {
      await addTask({
        title: formData.title,
        description: formData.description,
      });
    }
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      title: '',
      description: '',
    });
  }

  const handleOpenModal = (task?: Task) => {
    if (task) {
      setSelectedTask(task);
      setFormData({ title: task.title, description: task.description });
    } else {
      setSelectedTask(null);
      setFormData({ title: '', description: '' });
    }
    setIsModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddTask={() => handleOpenModal()} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(task => (
            <TaskCard key={task._id} task={task} onEdit={handleOpenModal} />
          ))}
        </div>
      </main>

      <TaskModal task={selectedTask} onSubmit={handleSubmit} formData={formData} setFormData={setFormData} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}

export default App
