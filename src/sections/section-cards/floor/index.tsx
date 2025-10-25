import ProgressDetailHead from '@/components/common/progress-detail-head'
import FlatCard from '../flat'
import "./styles.css"
import type { FlatProgress } from '@/types'
import { Activity, useCallback, useEffect, useState } from 'react'
import { AREAS_DUMMY } from '@/data'
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

  const { flatsCheckersOnFloorChange } = useProgressContext()

  useEffect(() => {
    flatsCheckersOnFloorChange.current[floorId] = setFlatsCheckedOnFloorCheck
  }, [flatsCheckersOnFloorChange, setFlatsCheckedOnFloorCheck, floorId])

  const { areasCheckerOnFlatChange } = useProgressContext()

  const setFlatCheckedOnAreasCheck = useCallback((flatId: number, areas: Record<number, boolean>) => {
    let isOneAreaUnchecked: boolean = false;
    Object.values(areas).forEach(areaChecked => {
      if (!areaChecked) isOneAreaUnchecked = true
    })
    if (isOneAreaUnchecked) setFlatsChecked(prev => ({ ...prev, [flatId]: false }))
    else setFlatsChecked(prev => ({ ...prev, [flatId]: true }))
  }, [])

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
              flatId={flat.id}
              bhkCount={flat.bhk}
              flatNumber={flat.flat_number}
              expanded={flat.expanded || false}
              handleClick={() => toggleFlatExpansion(flat.id)}
              areas={AREAS_DUMMY.filter(area => area.flat_id === flat.id)}
              checked={flatsChecked[flat.id] || false}
              handleCheckedChange={() => {
                let newCheckedVal: boolean
                setFlatsChecked(prev => {
                  newCheckedVal = !prev[flat.id]
                  return { ...prev, [flat.id]: !prev[flat.id] }
                })
                setTimeout(() => areasCheckerOnFlatChange.current?.[flat.id]?.(flat.id, newCheckedVal), 0)
              }}
              setFlatCheckedOnAreasCheck={setFlatCheckedOnAreasCheck}
            />
          ))}
        </div>
      </Activity>

    </div>
  )
}

export default FloorCard