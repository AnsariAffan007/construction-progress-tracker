import { useCallback, useRef, useState } from 'react'
import './App.css'
import AppBreadcrumb from './components/layout/breadcrumb'
import FilterCard from './sections/filter-card'
import FloorCard from './sections/section-cards/floor'
import { FLATS_DUMMY, FLOORS_DUMMY } from './data'
import { ProgressContextProvider } from './ProgressContext'

function App() {

  const [editing, setEditing] = useState(false)

  const [floors, setFloors] = useState(FLOORS_DUMMY)
  const toggleFloorExpansion = useCallback((floorId: number) => {
    setFloors(prev => prev.map(floor => floor.id === floorId ? { ...floor, expanded: !floor.expanded } : { ...floor }))
  }, [])

  const [floorsChecked, setFloorsChecked] = useState(() => {
    const temp: Record<number, boolean> = {}
    FLOORS_DUMMY.forEach(floor => {
      temp[floor.id] = floor.checked || false
    })
    return temp
  })

  const setFloorCheckedOnFlatsCheck = useCallback((floorId: number, flats: Record<number, boolean>) => {
    let isOneFlatUnchecked: boolean = false;
    Object.values(flats).forEach(flatChecked => {
      if (!flatChecked) isOneFlatUnchecked = true
    })
    if (isOneFlatUnchecked) setFloorsChecked(prev => ({ ...prev, [floorId]: false }))
    else setFloorsChecked(prev => ({ ...prev, [floorId]: true }))
  }, [])

  const flatsCheckerCallerRef = useRef<Record<number, ((floorId: number, floorChecked: boolean) => void)>>({})

  return (
    <ProgressContextProvider values={{ editing: editing }}>
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

        {floors.map((floor, floorIndex) => (
          <FloorCard
            key={floorIndex}
            floorId={floor.id}
            floorName={floor.name}
            expanded={floor.expanded || false}
            handleClick={() => toggleFloorExpansion(floor.id)}
            flats={FLATS_DUMMY.filter(flat => flat.floor_id === floor.id)}
            checked={floorsChecked[floor.id] || false}
            handleCheckedChange={() => {
              let newCheckedVal: boolean
              setFloorsChecked(prev => {
                newCheckedVal = !prev[floor.id]
                return { ...prev, [floor.id]: newCheckedVal }
              })
              setTimeout(() => flatsCheckerCallerRef.current?.[floor.id]?.(floor.id, newCheckedVal), 0)
            }}
            setFloorCheckedOnFlatsCheck={setFloorCheckedOnFlatsCheck}
            flatsCheckerCallerRef={flatsCheckerCallerRef}
          />
        ))}

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