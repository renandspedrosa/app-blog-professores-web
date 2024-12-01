import { useState } from 'react'

const PostTags = ({ tags }) => {
  const [hoveredTag, setHoveredTag] = useState(null)

  const handleMouseEnter = (tag) => {
    setHoveredTag(tag)
    console.log(`Hovered over: ${tag.name}`)
  }

  const handleMouseLeave = () => {
    setHoveredTag(null)
  }

  return (
    <div className='w-full flex flex-wrap gap-2 mb-1'>
      {tags.map((tag) => (
        <span
          key={tag.name}
          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset cursor-pointer ${
            hoveredTag === tag
              ? 'bg-blue-100 text-blue-900 ring-blue-900/10'
              : 'bg-blue-50 text-blue-700 ring-blue-700/10'
          }`}
          onMouseEnter={() => handleMouseEnter(tag)}
          onMouseLeave={handleMouseLeave}
        >
          {tag.name.toUpperCase()}
        </span>
      ))}
    </div>
  )
}

export default PostTags
