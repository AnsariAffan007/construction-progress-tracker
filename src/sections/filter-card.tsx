
const FilterCard = ({ content, active }: { content: string, active?: boolean }) => {
  return (
    <div className={`tab ${active ? "active" : ""}`}>
      <div className='flex gap-x-2 items-center'>
        <span>📋</span>
        <span className='text-[#333] text-[14px] my-auto'>{content}</span>
      </div>
    </div>
  )
}

export default FilterCard