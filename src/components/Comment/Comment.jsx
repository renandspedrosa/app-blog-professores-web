import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const Comment = ({ comment, index }) => {
  if (!comment || !comment.user) {
    return null // Retorne null se os dados do comentário estiverem ausentes
  }
  const formattedDate = (commentCreatedAt) => {
    const date = new Date(commentCreatedAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    return date
  }

  return (
    <>
      <div
        className='rounded-lg rounded-t-lg border border-gray-200 m-4'
        key={index}
      >
        <article className='p-4 text-base bg-white rounded-lg mr-1'>
          <footer className='flex justify-between items-center mb-2'>
            <div className='flex items-center justify-between w-full'>
              <p className='inline-flex text-gray-400 items-center text-xs flex-4/5'>
                {comment.user.name}
              </p>
              <p className='text-gray-400 flex-1/5 text-xs px-2'>
                <time
                  dateTime={formattedDate(comment.created_at)}
                  title={formattedDate(comment.created_at)}
                >
                  {formattedDate(comment.created_at)}
                </time>
              </p>
            </div>
            <div>
              <Menu as='div' className='relative inline-block text-left'>
                <div>
                  <MenuButton className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                      />
                    </svg>
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
                >
                  <div className='py-1'>
                    <MenuItem>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none'
                      >
                        Remover
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </footer>
          <div className='flex text-gray-600 items-center mt-4 space-x-4'>
            <p className=''>{comment.content}</p>
          </div>
        </article>
      </div>
    </>
  )
}

export default Comment
