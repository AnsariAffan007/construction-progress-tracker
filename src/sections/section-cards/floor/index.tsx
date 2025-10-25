import ProgressDetailHead from '@/components/common/progress-detail-head'
import FlatCard from '../flat'
import "./styles.css"
import type { FlatProgress } from '@/types'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AREAS_DUMMY, LINE_ITEMS_DUMMY } from '@/data'
import { useProgressContext } from '@/ProgressContext'

interface FloorCard {
  floorId: number,
  floorName: string,
  expanded: boolean,
  handleClick: () => void,
  flats: FlatProgress[],
  checked: boolean,
  handleCheckedChange: () => void,
  setFloorCheckedOnFlatsCheck: (floorId: number, flats: Record<number, boolean>) => void,
  status: boolean
}

// #region MAIN
const FloorCard = ({
  checked,
  handleCheckedChange,
  floorId,
  floorName,
  expanded,
  handleClick,
  flats,
  setFloorCheckedOnFlatsCheck,
  status
}: FloorCard) => {

  // Listing State
  const [flatsState, setFlatsState] = useState(flats)
  // useEffect(() => setFlatsState(flats), [flats])

  // Toggling flat expansion to show areas
  const toggleFlatExpansion = useCallback((flatId: number) => {
    setFlatsState(prev => prev.map(flat => flat.id === flatId ? { ...flat, expanded: !flat.expanded } : { ...flat }))
  }, [])

  // Local state to track flats checking
  const [flatsChecked, setFlatsChecked] = useState(() => {
    const temp: Record<number, boolean> = {}
    flats.forEach(flat => {
      temp[flat.id] = flat.status || false
    })
    return temp
  })

  // #region floor--flat sync
  // Floor - parent  |  Flat - CHILD (Current)

  // Child propagating to parent (Flats checking trigger recalculation of floor checked)
  const isFirstRender = useRef(true) // To prevent floor checking on first render
  useEffect(() => {
    if (!isFirstRender.current) setFloorCheckedOnFlatsCheck(floorId, flatsChecked)
    isFirstRender.current = false;
  }, [flatsChecked, setFloorCheckedOnFlatsCheck, floorId])

  // Parent propagating to child (Floor check triggers flats checked state recalculation)
  const setFlatsCheckedOnFloorCheck = useCallback((floorIdBeingChecked: number, floorChecked: boolean) => {
    if (floorIdBeingChecked !== floorId) return;
    setFlatsChecked(prev => {
      const temp: Record<number, boolean> = {}
      Object.keys(prev).forEach(flatId => {
        temp[parseInt(flatId)] = floorChecked
      })
      return temp
    })
  }, [floorId])

  const { flatsCheckersOnFloorChange, handleFlatSelectionsRef } = useProgressContext()
  useEffect(() => {
    flatsCheckersOnFloorChange.current[floorId] = setFlatsCheckedOnFloorCheck
  }, [flatsCheckersOnFloorChange, setFlatsCheckedOnFloorCheck, floorId])


  // #region flat-area sync
  // Flat - Parent (Current)  |  Area - child

  // Child to parent propagation (Areas checking triggers flat checked recalculation)
  const setFlatCheckedOnAreasCheck = useCallback((flatId: number, areas: Record<number, boolean>) => {
    let isOneAreaUnchecked: boolean = false;
    Object.values(areas).forEach(areaChecked => {
      if (!areaChecked) isOneAreaUnchecked = true
    })
    if (Object.values(areas).length === 0) isOneAreaUnchecked = true
    if (isOneAreaUnchecked) setFlatsChecked(prev => ({ ...prev, [flatId]: false }))
    else setFlatsChecked(prev => ({ ...prev, [flatId]: true }))
  }, [])

  // Parent to child propagation (Flat checking triggers areas checked recalculation & items checked recalculation)
  const { areasCheckerOnFlatChange, itemsCheckerOnAreaChange, itemFilter } = useProgressContext()
  const handleFlatCheck = useCallback((flatId: number) => {
    let newCheckedVal: boolean
    setFlatsChecked(prev => {
      newCheckedVal = !prev[flatId]
      return { ...prev, [flatId]: newCheckedVal }
    })
    setTimeout(() => {
      // Checking areas
      areasCheckerOnFlatChange.current?.[flatId]?.(flatId, newCheckedVal)
      // Checking items
      const areaIdsUnderThisFlat = AREAS_DUMMY.filter(area => area.flat_id === flatId).map(area => area.id)
      areaIdsUnderThisFlat.forEach(areaId => {
        itemsCheckerOnAreaChange.current?.[areaId]?.(areaId, newCheckedVal)
      })
    }, 0)
  }, [areasCheckerOnFlatChange, itemsCheckerOnAreaChange])

  // #region Save/Revert
  const handleFlatSelection = useCallback((action: "save" | "cancel") => {
    if (action === "save") setFlatsState(prev => prev.map(flat => ({ ...flat, status: flatsChecked[flat.id] })))
    else {
      setFlatsChecked(() => {
        const temp: Record<number, boolean> = {}
        flats.forEach(flat => {
          temp[flat.id] = flat.status || false
        })
        return temp
      })
    }
  }, [flatsChecked, flats])
  useEffect(() => {
    handleFlatSelectionsRef.current[floorId] = handleFlatSelection
  }, [handleFlatSelection, handleFlatSelectionsRef, floorId])

  // #region Filtering
  const filteredFlats = useMemo(() => {
    if (itemFilter.length === 0) return flatsState
    return flatsState.filter(flat => {
      const areasUnderFlat_ids = AREAS_DUMMY.filter(area => area.flat_id === flat.id).map(area => area.id)
      const itemsUnderAboveAreas_names = LINE_ITEMS_DUMMY.filter(item => areasUnderFlat_ids.includes(item.area_id)).map(item => item.name)
      if (itemsUnderAboveAreas_names.includes(itemFilter)) return true;
      else return false;
    })
  }, [flatsState, itemFilter])

  // #region JSX
  return (
    <div className="floor-card">

      <ProgressDetailHead
        handleClick={() => handleClick()}
        background
        section='floor'
        itemName={floorName}
        checked={checked}
        handleCheckedChange={handleCheckedChange}
        itemStatus={status}
      />

      <div className={`floor-content ${expanded ? 'expanded' : ''}`}>
        {filteredFlats.map(flat => (
          <FlatCard
            key={flat.id}
            flatId={flat.id}
            bhkCount={flat.bhk}
            flatNumber={flat.flat_number}
            expanded={flat.expanded || false}
            handleClick={() => toggleFlatExpansion(flat.id)}
            areas={AREAS_DUMMY.filter(area => area.flat_id === flat.id)}
            checked={flatsChecked[flat.id] || false}
            handleCheckedChange={() => handleFlatCheck(flat.id)}
            setFlatCheckedOnAreasCheck={setFlatCheckedOnAreasCheck}
            status={flat.status}
          />
        ))}
      </div>

    </div>
  )
}

export default FloorCard