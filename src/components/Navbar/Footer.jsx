export const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className='w-full fixed bottom-0 left-0 bg-white dark:bg-gray-800'>
      <div className='max-w-screen-xl mx-auto py-3 justify-center'>
        <span className='flex justify-center text-sm text-gray-500 text-center dark:text-gray-400'>
          © {year}. Todos os Direitos Reservados.
        </span>
      </div>
    </footer>
  )
}
