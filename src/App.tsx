import { useCallback, useState } from 'react'
import './App.css'
import AppBreadcrumb from './components/layout/breadcrumb'
import FilterCard from './sections/filter-card'
import { ProgressContextProvider, useProgressContext } from './ProgressContext'
import Progress from './Progress'
import { AREAS_DUMMY, FLATS_DUMMY, LINE_ITEMS_DUMMY } from './data'

// #region MAIN
function App() {

  const [editing, setEditing] = useState(false)

  return (
    <ProgressContextProvider editing={editing}>

      {/* Breadcrumb */}
      <div className='breadcrumb'>
        <span>☰</span>
        <AppBreadcrumb />
      </div>

      {/* Title */}
      <div className='header'>
        <h1>WORK-ORDER-Y-0016</h1>
      </div>

      {/* Button Filters */}
      <div className='tabs'>
        <FilterCard content='Typical Area' active />
        <FilterCard content='Other Areas with Quantity' />
        <FilterCard content='Other Areas without Quantity' />
      </div>

      {/* Item filters */}
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

      {/* Progress section */}
      <div id='layoutContainer'>

        <Progress />

      </div>

      {/* Update & Save Buttons */}
      <SaveButtons editing={editing} setEditing={setEditing} />

    </ProgressContextProvider>
  )
}

// #region Save buttons
const SaveButtons = ({
  editing,
  setEditing
}: { editing: boolean, setEditing: React.Dispatch<React.SetStateAction<boolean>> }) => {

  const { handleFloorSelectionsRef, handleFlatSelectionsRef, handleAreaSelectionsRef, handleItemSelectionsRef } = useProgressContext()

  // Save/Cancel handler
  const handleAction = useCallback((action: "save" | "cancel") => {
    // handle floors
    handleFloorSelectionsRef.current(action)
    // handle flats
    FLATS_DUMMY.forEach(flat => {
      handleFlatSelectionsRef.current[flat.id]?.(action)
    })
    // handle areas
    AREAS_DUMMY.forEach(area => {
      handleAreaSelectionsRef.current[area.id]?.(action)
    })
    // handle line items
    LINE_ITEMS_DUMMY.forEach(item => {
      handleItemSelectionsRef.current[item.id]?.(action)
    })
    setEditing(false)
  }, [handleFloorSelectionsRef, handleFlatSelectionsRef, handleAreaSelectionsRef, handleItemSelectionsRef, setEditing])

  // JSX
  return (
    !editing ? (
      <button className='update-button fixed bottom-[30px] right-[30px] bg-[#1f2937]' onClick={() => setEditing(true)}>
        Update Details
      </button>
    ) : (
      <div className='flex gap-x-4 items-center fixed bottom-[30px] right-[30px]'>
        <button className='update-button bg-[#10b981]' onClick={() => handleAction("save")}>
          Save
        </button>
        <button className='update-button bg-[#1f2937]' onClick={() => handleAction("cancel")}>
          Cancel
        </button>
      </div>
    )
  )
}

export default App