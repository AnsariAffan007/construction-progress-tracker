import ProgressDetailHead from '@/components/common/progress-detail-head'
import FlatCard from '../flat'
import "./styles.css"
import type { FlatProgress } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import { AREAS_DUMMY } from '@/data'

interface FloorCard {
  floorName: string,
  expanded: boolean,
  handleClick: () => void,
  flats: FlatProgress[]
}

const FloorCard = ({ floorName, expanded, handleClick, flats }: FloorCard) => {

  const [flatsState, setFlatsState] = useState(flats)
  useEffect(() => setFlatsState(flats), [flats])

  const toggleFlatExpansion = useCallback((flatId: number) => {
    setFlatsState(prev => prev.map(flat => flat.id === flatId ? { ...flat, expanded: !flat.expanded } : { ...flat }))
  }, [])

  return (
    <div className="floor-card">

      <ProgressDetailHead handleClick={() => handleClick()} background section='floor' itemName={floorName} />

      <div className={`floor-content ${expanded ? "block" : "hidden"}`}>
        {flatsState.map((flat, flatIndex) => (
          <FlatCard
            key={flatIndex}
            bhkCount={flat.bhk}
            flatNumber={flat.flat_number}
            expanded={flat.expanded || false}
            handleClick={() => toggleFlatExpansion(flat.id)}
            areas={AREAS_DUMMY.filter(area => area.flat_id === flat.id)}
          />
        ))}
      </div>

    </div>
  )
}

export default FloorCard