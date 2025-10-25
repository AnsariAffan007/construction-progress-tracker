import { useCallback, useState } from 'react'
import { FLATS_DUMMY, FLOORS_DUMMY } from './data'
import { useProgressContext } from './ProgressContext'
import FloorCard from './sections/section-cards/floor'

// #region MAIN
const Progress = () => {

  // Listing state
  const [floors, setFloors] = useState(FLOORS_DUMMY)

  // Toggle floor expansion
  const toggleFloorExpansion = useCallback((floorId: number) => {
    setFloors(prev => prev.map(floor => floor.id === floorId ? { ...floor, expanded: !floor.expanded } : { ...floor }))
  }, [])

  // Local state for if floor is checked or not
  const [floorsChecked, setFloorsChecked] = useState(() => {
    const temp: Record<number, boolean> = {}
    FLOORS_DUMMY.forEach(floor => {
      temp[floor.id] = floor.checked || false
    })
    return temp
  })

  // #region Floor-flat sync
  // Floor --> PARENT (Current)  |  Flat --> Child

  // Child propagating to Parent (Flats check triggers floor checked state recalculation)
  const setFloorCheckedOnFlatsCheck = useCallback((floorId: number, flats: Record<number, boolean>) => {
    let isOneFlatUnchecked: boolean = false;
    Object.values(flats).forEach(flatChecked => {
      if (!flatChecked) isOneFlatUnchecked = true
    })
    if (isOneFlatUnchecked) setFloorsChecked(prev => ({ ...prev, [floorId]: false }))
    else setFloorsChecked(prev => ({ ...prev, [floorId]: true }))
  }, [])

  // Parent propagating to child (Floor check triggers flats checked state recalculation)
  const { flatsCheckersOnFloorChange } = useProgressContext()

  // #region JSX
  return (
    floors.map((floor, floorIndex) => (
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
          setTimeout(() => flatsCheckersOnFloorChange.current?.[floor.id]?.(floor.id, newCheckedVal), 0)
        }}
        setFloorCheckedOnFlatsCheck={setFloorCheckedOnFlatsCheck}
      />
    ))
  )
}

export default Progress