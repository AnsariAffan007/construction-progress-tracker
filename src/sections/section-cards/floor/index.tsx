import ProgressDetailHead from '@/components/common/progress-detail-head'
import FlatCard from '../flat'
import "./styles.css"
import type { FlatProgress } from '@/types'
import { Activity, useCallback, useState } from 'react'
import { AREAS_DUMMY, FLATS_DUMMY } from '@/data'

interface FloorCard {
  floorName: string,
  expanded: boolean,
  handleClick: () => void,
  flats: FlatProgress[],
  checked: boolean,
  handleCheckedChange: () => void
}

const FloorCard = ({ checked, handleCheckedChange, floorName, expanded, handleClick, flats }: FloorCard) => {

  const [flatsState, setFlatsState] = useState(flats)
  // useEffect(() => setFlatsState(flats), [flats])

  const toggleFlatExpansion = useCallback((flatId: number) => {
    setFlatsState(prev => prev.map(flat => flat.id === flatId ? { ...flat, expanded: !flat.expanded } : { ...flat }))
  }, [])

  const [flatsChecked, setFlatsChecked] = useState(() => {
    const temp: Record<number, boolean> = {}
    FLATS_DUMMY.forEach(floor => {
      temp[floor.id] = floor.checked || false
    })
    return temp
  })

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