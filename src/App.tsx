import './App.css'
import AppBreadcrumb from './components/layout/breadcrumb'

function App() {
  return (
    <>
      <div className='flex items-center gap-3 mb-[20px]'>
        <span style={{ color: "#999" }}>☰</span>
        <AppBreadcrumb />
      </div>
      <div className='font-semibold mb-[30px] text-[#333]'>
        <h1 className='text-3xl'>WORK-ORDER-Y-0016</h1>
      </div>
      <div className='flex gap-x-[10px] items-center mb-[20px]'>
        <FilterCard content='Typical Area' active />
        <FilterCard content='Other Areas with Quantity' />
        <FilterCard content='Other Areas without Quantity' />
      </div>
    </>
  )
}


function FilterCard({ content, active }: { content: string, active?: boolean }) {
  return (
    <div
      className={`
        py-[12px] px-[20px] border rounded-sm
        ${active ? 'bg-transparent border-[#ccc]' : 'bg-white border-[#e0e0e0]'}`
      }
    >
      <div className='flex gap-x-2 items-center'>
        <span>📋</span>
        <span className='text-[#333] text-[14px] my-auto'>{content}</span>
      </div>
    </div>
  )
}


export default App