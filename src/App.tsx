import { useState } from "react";
import Header from "./components/header"
import TaskCard from "./components/task-card"
import TaskModal from "./components/task-modal"
import { FormData } from "./types";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
  });

  const tasks = useQuery(api.tasks.getTasks) || [];
  const addTask = useMutation(api.tasks.addTask);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addTask({
      title: formData.title,
      description: formData.description
    });
    handleCloseModal();
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      title: '',
      description: '',
    });
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddTask={handleOpenModal} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(task => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      </main>

      <TaskModal onSubmit={handleSubmit} formData={formData} setFormData={setFormData} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}

export default App
