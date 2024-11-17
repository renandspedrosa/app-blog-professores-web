import { ArrowRight, Eye, MessageCircle } from 'lucide-react'

const PostCard = ({ post, index, handleReadMore }) => {
  const image = post.path_img
  const title = post.title
  const tags = post.tags
  const content = post.content
  const teacherName = post.teacher.user.name
  const id = post.id
  // const views = post.views
  // const comments = post.comments

  return (
    <div
      className='p-4 sm:w-1/2 md:w-1/3 w-full min-w-[300px] sm:min-w-[350px]'
      key={index}
    >
      <div
        className='bg-white h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden flex flex-col'
        style={{ minHeight: '400px' }}
      >
        {image && (
          <img
            className='lg:h-48 md:h-36 w-full object-cover object-center flex-shrink-0'
            src={image}
            alt={title}
            style={{ maxHeight: '300px' }}
          />
        )}
        <div className='p-6 flex-1 flex flex-col'>
          <div className='flex-grow'>
            <h1 className='title-font text-lg font-medium text-gray-900'>
              {title}
            </h1>
            <h2 className='tracking-widest text-xs text-transform: capitalize title-font font-small text-gray-400 mb-1'>
              {teacherName}
            </h2>
          </div>
          <p className='leading-relaxed mb-3'>
            {content.length > 100
              ? `${content.substring(0, 100)} [ ... ]`
              : content}
          </p>
          <div className='flex items-center flex-wrap'>
            <div className='w-full flex flex-wrap gap-2 mb-1'>
              {tags.map((tag) => (
                <span
                  key={tag.name}
                  className='inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10'
                >
                  {tag.name.toUpperCase()}
                </span>
              ))}
            </div>

            <a
              className='text-indigo-600 hover:text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer'
              onClick={() => handleReadMore(id)}
            >
              Leia mais
              <ArrowRight className='w-4 h-4 ml-1' />
            </a>
            <span className='text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200'>
              <Eye size={18} strokeWidth={1.6} className='mr-1' />0{' '}
              {/*post.views*/}
            </span>
            <span className='text-gray-400 inline-flex items-center leading-none text-sm'>
              <MessageCircle size={15.5} strokeWidth={2.1} className='mr-1' />0{' '}
              {/*post.comments*/}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PostCard
