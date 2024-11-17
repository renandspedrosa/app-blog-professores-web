const PostContent = ({ content }) => (
  <p className='leading-relaxed mb-3'>
    {content.length > 100 ? `${content.substring(0, 100)} [ ... ]` : content}
  </p>
)

export default PostContent
