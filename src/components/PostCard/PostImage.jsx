const PostImage = ({ image, title }) => {
  if (!image) return null
  return (
    <img
      className='lg:h-48 md:h-36 w-full object-cover object-center flex-shrink-0'
      src={image}
      alt={title}
      style={{ maxHeight: '300px' }}
    />
  )
}

export default PostImage
