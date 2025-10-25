import { useCallback, useState } from 'react'
import { FLATS_DUMMY, FLOORS_DUMMY } from './data'
import { useProgressContext } from './ProgressContext'
import FloorCard from './sections/section-cards/floor'

const Progress = () => {

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

  const { flatsCheckersOnFloorChange } = useProgressContext()

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