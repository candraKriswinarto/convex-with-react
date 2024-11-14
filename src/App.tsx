import { useState } from "react";
import Header from "./components/header"
import TaskCard from "./components/task-card"
import TaskModal from "./components/task-modal"
import { FormData } from "./types";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      title: '',
      description: '',
    });
    setIsModalOpen(false);
  }

  const tasks = [
    {
      _id: '1',
      title: 'task one',
      description: 'this is task one',
      completed: false
    },
    {
      _id: '2',
      title: 'task two',
      description: 'this is task two',
      completed: true
    },
  ]

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
            <TaskCard task={task} />
          ))}
        </div>
      </main>

      <TaskModal onSubmit={handleSubmit} formData={formData} setFormData={setFormData} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}

export default App
