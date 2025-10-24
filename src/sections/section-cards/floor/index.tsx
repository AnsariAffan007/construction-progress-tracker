import ProgressDetailHead from '@/components/common/progress-detail-head'
import FlatCard from '../flat'
import "./styles.css"
import type { FlatProgress } from '@/types'
import { Activity, useCallback, useEffect, useState, type RefObject } from 'react'
import { AREAS_DUMMY } from '@/data'

interface FloorCard {
  floorId: number,
  floorName: string,
  expanded: boolean,
  handleClick: () => void,
  flats: FlatProgress[],
  checked: boolean,
  handleCheckedChange: () => void,
  setFloorCheckedOnFlatsCheck: (floorId: number, flats: Record<number, boolean>) => void,
  flatsCheckerCallerRef: RefObject<Record<number, (floorId: number, floorChecked: boolean) => void>>
}

const FloorCard = ({
  checked,
  handleCheckedChange,
  floorId,
  floorName,
  expanded,
  handleClick,
  flats,
  setFloorCheckedOnFlatsCheck,
  flatsCheckerCallerRef
}: FloorCard) => {

  const [flatsState, setFlatsState] = useState(flats)
  // useEffect(() => setFlatsState(flats), [flats])

  const toggleFlatExpansion = useCallback((flatId: number) => {
    setFlatsState(prev => prev.map(flat => flat.id === flatId ? { ...flat, expanded: !flat.expanded } : { ...flat }))
  }, [])

  const [flatsChecked, setFlatsChecked] = useState(() => {
    const temp: Record<number, boolean> = {}
    flats.forEach(flat => {
      temp[flat.id] = flat.checked || false
    })
    return temp
  })

  useEffect(() => {
    setFloorCheckedOnFlatsCheck(floorId, flatsChecked)
  }, [flatsChecked, setFloorCheckedOnFlatsCheck, floorId])

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

  useEffect(() => {
    flatsCheckerCallerRef.current[floorId] = setFlatsCheckedOnFloorCheck
  }, [flatsCheckerCallerRef, setFlatsCheckedOnFloorCheck, floorId])

  // const cancelFloorSelection = useCallback(() => {

  // }, [])

  // const saveFloorSelection = useCallback(() => {

  // }, [])

  return (
    <div className="floor-card">

      <ProgressDetailHead
        handleClick={() => handleClick()}
        background
        section='floor'
        itemName={floorName}
        checked={checked}
        handleCheckedChange={handleCheckedChange}
      />

      <Activity mode={expanded ? 'visible' : "hidden"}>
        <div className={`floor-content`}>
          {flatsState.map((flat, flatIndex) => (
            <FlatCard
              key={flatIndex}
              bhkCount={flat.bhk}
              flatNumber={flat.flat_number}
              expanded={flat.expanded || false}
              handleClick={() => toggleFlatExpansion(flat.id)}
              areas={AREAS_DUMMY.filter(area => area.flat_id === flat.id)}
              checked={flatsChecked[flat.id] || false}
              handleCheckedChange={() => setFlatsChecked(prev => ({ ...prev, [flat.id]: !prev[flat.id] }))}
            />
          ))}
        </div>
      </Activity>

    </div>
  )
}

export default FloorCard