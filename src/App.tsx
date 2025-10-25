import { useState } from 'react'
import './App.css'
import AppBreadcrumb from './components/layout/breadcrumb'
import FilterCard from './sections/filter-card'
import { ProgressContextProvider } from './ProgressContext'
import Progress from './Progress'

function App() {

  const [editing, setEditing] = useState(false)

  return (
    <ProgressContextProvider editing={editing}>
      <div className='breadcrumb'>
        <span>☰</span>
        <AppBreadcrumb />
      </div>

      <div className='header'>
        <h1>WORK-ORDER-Y-0016</h1>
      </div>

      <div className='tabs'>
        <FilterCard content='Typical Area' active />
        <FilterCard content='Other Areas with Quantity' />
        <FilterCard content='Other Areas without Quantity' />
      </div>

      <div className='filter-section'>
        <label>Filter Line Items:</label>
        <select id="lineItemFilter" className='filter-dropdown'>
          <option value="">Select an option</option>
          <option value="LIT-01">LIT-01 (lit)</option>
          <option value="LIT-02">LIT-02 (lit)</option>
          <option value="SG CHEMICAL NEW X">SG CHEMICAL NEW X (t)</option>
          <option value="PAINT-01">PAINT-01 (sqm)</option>
          <option value="TILE-01">TILE-01 (sqm)</option>
        </select>
      </div>

      <div id='layoutContainer'>

        <Progress />

      </div>

      {!editing ? (
        <button className='update-button fixed bottom-[30px] right-[30px] bg-[#1f2937]' onClick={() => setEditing(true)}>
          Update Details
        </button>
      ) : (
        <div className='flex gap-x-4 items-center fixed bottom-[30px] right-[30px]'>
          <button className='update-button bg-[#10b981]'>
            Save
          </button>
          <button className='update-button bg-[#1f2937]' onClick={() => setEditing(false)}>
            Cancel
          </button>
        </div>
      )}

    </ProgressContextProvider>
  )
}

export default App