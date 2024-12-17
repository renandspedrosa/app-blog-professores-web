import { ButtonPrimary, ButtonTertiary } from '@/components/Buttons'

const Modal = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div
        className='bg-white rounded-lg shadow-lg w-[90%] max-w-md md:max-w-lg lg:max-w-2xl p-6 relative max-h-screen overflow-y-auto [&::-webkit-scrollbar]:w-2
[&::-webkit-scrollbar-track]:rounded-full
[&::-webkit-scrollbar-track]:bg-gray-100
[&::-webkit-scrollbar-thumb]:rounded-full
[&::-webkit-scrollbar-thumb]:bg-gray-300
dark:[&::-webkit-scrollbar-track]:bg-gray-50
dark:[&::-webkit-scrollbar-thumb]:bg-gray-400'
      >
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-500 hover:text-gray-800'
          aria-label='Fechar'
        >
          ✕
        </button>
        <h2 className='text-xl font-bold text-gray-800 mb-4'>{title}</h2>

        <div>{children}</div>

        <div className='mt-6 flex justify-end gap-3'>
          <ButtonTertiary onClick={onClose}>Cancelar</ButtonTertiary>

          <ButtonPrimary type='submit' onClick={onConfirm}>
            Confirmar
          </ButtonPrimary>
        </div>
      </div>
    </div>
  )
}

export default Modal
