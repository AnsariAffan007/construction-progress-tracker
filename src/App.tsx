import { useCallback, useState } from 'react'
import './App.css'
import AppBreadcrumb from './components/layout/breadcrumb'
import FilterCard from './sections/filter-card'
import FloorCard from './sections/section-cards/floor'
import { FLATS_DUMMY, FLOORS_DUMMY } from './data'

function App() {

  const [floors, setFloors] = useState(FLOORS_DUMMY)
  const toggleFloorExpansion = useCallback((floorId: number) => {
    setFloors(prev => prev.map(floor => floor.id === floorId ? { ...floor, expanded: !floor.expanded } : { ...floor }))
  }, [])

  return (
    <>
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
            floorName={floor.name}
            expanded={floor.expanded || false}
            handleClick={() => toggleFloorExpansion(floor.id)}
            flats={FLATS_DUMMY.filter(flat => flat.floor_id === floor.id)}
          />
        ))}

      </div>

      <button className='update-button'>
        Update Details
      </button>
    </>
  )
}

export default App