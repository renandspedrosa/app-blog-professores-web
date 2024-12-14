const PostImage = ({ image, title }) => {
  const host = import.meta.env.VITE_API_HOST || 'http://localhost:3000'
  if (!image) {
    return null
  } else {
    image = host + '/' + image
  }
  return (
    <img
      className='lg:h-48 md:h-36 w-full object-cover object-center flex-1 flex-shrink-0 rounded-t-lg'
      src={image}
      alt={title}
      style={{ maxHeight: '300px' }}
    />
  )
}

export default PostImage
