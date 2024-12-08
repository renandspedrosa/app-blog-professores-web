const PostContent = ({ content, hasImage }) => (
  <>
    {hasImage ? (
      <p className='flex-1 leading-relaxed mb-3 break-words'>
        {content.length > 100 ? content.substring(0, 100) + '[...]' : content}
      </p>
    ) : (
      <p className='flex-grow leading-relaxed mb-3 break-words'>
        {content.length > 200 ? content.substring(0, 200) + '[...]' : content}
      </p>
    )}
  </>
)
//
export default PostContent
