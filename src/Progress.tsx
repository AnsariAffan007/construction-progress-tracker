import { useCallback, useEffect, useMemo, useState } from 'react'
import { AREAS_DUMMY, FLATS_DUMMY, FLOORS_DUMMY, LINE_ITEMS_DUMMY } from './data'
import { useProgressContext } from './ProgressContext'
import FloorCard from './sections/section-cards/floor'

// #region MAIN
const Progress = () => {

  const { flatsCheckersOnFloorChange, areasCheckerOnFlatChange, itemsCheckerOnAreaChange, handleFloorSelectionsRef, itemFilter } = useProgressContext()

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
      temp[floor.id] = floor.status || false
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
    if (Object.values(flats).length === 0) isOneFlatUnchecked = true
    if (isOneFlatUnchecked) setFloorsChecked(prev => ({ ...prev, [floorId]: false }))
    else setFloorsChecked(prev => ({ ...prev, [floorId]: true }))
  }, [])

  // Parent propagating to child (Floor check triggers (flats, area, & items) checked state recalculation)
  const handleFloorCheck = useCallback((floorId: number) => {
    let newCheckedVal: boolean
    setFloorsChecked(prev => {
      newCheckedVal = !prev[floorId]
      return { ...prev, [floorId]: newCheckedVal }
    })
    setTimeout(() => {
      // Checking flats
      flatsCheckersOnFloorChange.current?.[floorId]?.(floorId, newCheckedVal)
      // Checking areas
      const flatIdsUnderThisFloor = FLATS_DUMMY.filter(flat => flat.floor_id === floorId).map(flat => flat.id)
      flatIdsUnderThisFloor.forEach(flatId => {
        areasCheckerOnFlatChange.current?.[flatId]?.(flatId, newCheckedVal)
      })
      // Checking items
      const areaIdsUnderAboveFlats = AREAS_DUMMY.filter(area => flatIdsUnderThisFloor.includes(area.flat_id)).map(area => area.id)
      areaIdsUnderAboveFlats.forEach(areaId => {
        itemsCheckerOnAreaChange.current?.[areaId]?.(areaId, newCheckedVal)
      })
    }, 0)
  }, [flatsCheckersOnFloorChange, areasCheckerOnFlatChange, itemsCheckerOnAreaChange])

  // #region Save/Revert
  const handleFloorSelection = useCallback((action: "save" | "cancel") => {
    if (action === "save") setFloors(prev => prev.map(floor => ({ ...floor, status: floorsChecked[floor.id] })))
    else {
      setFloorsChecked(() => {
        const temp: Record<number, boolean> = {}
        FLOORS_DUMMY.forEach(floor => {
          temp[floor.id] = floor.status || false
        })
        return temp
      })
    }
  }, [floorsChecked])
  useEffect(() => {
    handleFloorSelectionsRef.current = handleFloorSelection
  }, [handleFloorSelection, handleFloorSelectionsRef])

  // #region Filtering
  const filteredFloors = useMemo(() => {
    if (itemFilter.length === 0) return floors
    return floors.filter(floor => {
      const flatsUnderFloor_ids = FLATS_DUMMY.filter(flat => flat.floor_id === floor.id).map(flat => flat.id)
      const areasUnderAboveFlats_ids = AREAS_DUMMY.filter(area => flatsUnderFloor_ids.includes(area.flat_id)).map(area => area.id)
      const itemsUnderAboveAreas_names = LINE_ITEMS_DUMMY.filter(item => areasUnderAboveFlats_ids.includes(item.area_id)).map(item => item.name)
      if (itemsUnderAboveAreas_names.includes(itemFilter)) return true;
      else return false;
    })
  }, [floors, itemFilter])

  // #region JSX
  return (
    filteredFloors.map(floor => (
      <FloorCard
        key={floor.id}
        floorId={floor.id}
        floorName={floor.name}
        expanded={floor.expanded || false}
        handleClick={() => toggleFloorExpansion(floor.id)}
        flats={FLATS_DUMMY.filter(flat => flat.floor_id === floor.id)}
        checked={floorsChecked[floor.id] || false}
        handleCheckedChange={() => handleFloorCheck(floor.id)}
        setFloorCheckedOnFlatsCheck={setFloorCheckedOnFlatsCheck}
        status={floor.status}
      />
    ))
  )
}

export default Progress