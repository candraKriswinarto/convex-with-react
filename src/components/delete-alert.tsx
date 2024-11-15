interface DeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteAlert = ({
  isOpen,
  onClose,
  onConfirm,
}: DeleteAlertProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-lg p-6 max-w-sm w-full'>
        <h3 className='text-lg font-medium mb-4'>Delete Confirmation</h3>
        <p className='text-gray-600 mb-6'>
          Are you sure you want to delete this task?
        </p>
        <div className='flex justify-end space-x-3'>
          <button
            onClick={onClose}
            className='px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
