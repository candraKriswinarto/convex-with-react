import { FormData, Task } from "../types"

interface TaskModalProps {
  task?: Task | null,
  formData: FormData,
  setFormData: (data: FormData) => void
  isOpen: boolean,
  onClose: () => void,
  onSubmit: (e: React.FormEvent) => void
}
export default function TaskModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  task
}: TaskModalProps) {

  if (!isOpen) {
    return null
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-lg max-w-md w-full p-6'>
        <h2 className='text-2xl font-bold mb-4'>
          {task ? 'Edit Task' : 'Add New Task'}
        </h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Title
            </label>
            <input
              type='text'
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              rows={3}
              required
            />
          </div>
          <div className='flex justify-end space-x-3'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200'
            >
              {task ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
