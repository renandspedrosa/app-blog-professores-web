const PostContent = ({ content, hasImage }) => (
  <p className='leading-relaxed mb-3'>
    {hasImage
      ? content.length > 100
        ? `${content.substring(0, 100)} [ ... ]`
        : content
      : content}
  </p>
)

export default PostContent
