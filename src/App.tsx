import { useCallback, useMemo, useState } from 'react'
import './App.css'
import AppBreadcrumb from './components/layout/breadcrumb'
import FilterCard from './sections/filter-card'
import { ProgressContextProvider, useProgressContext } from './ProgressContext'
import Progress from './Progress'
import { AREAS_DUMMY, FLATS_DUMMY, LINE_ITEMS_DUMMY } from './data'
import type { LineItem } from './types'

// #region MAIN
function App() {

  const [editing, setEditing] = useState(false)
  const [itemFilter, setItemFilter] = useState<string>("")

  const uniqueLineItems = useMemo(() => {
    const map: Record<string, LineItem> = {}
    LINE_ITEMS_DUMMY.forEach(item => map[item.name] = item)
    return Object.values(map)
  }, [])

  return (
    <ProgressContextProvider editing={editing} itemFilter={itemFilter}>

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
        <select id="lineItemFilter" className='filter-dropdown' onChange={(e) => setItemFilter(e.target.value)}>
          <option value="">Select an option</option>
          {uniqueLineItems.map(lineItem => {
            return (
              <option key={lineItem.id} value={lineItem.name}>{lineItem.name}</option>
            )
          })}
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