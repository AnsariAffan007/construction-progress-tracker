import ProgressDetailHead from "@/components/common/progress-detail-head"
import AreaCard from "../area"
import "./styles.css"
import type { AreaProgress } from "@/types"
import { useCallback, useEffect, useState } from "react"
import { LINE_ITEMS_DUMMY } from "@/data"

interface FlatCard {
  flatNumber: number,
  bhkCount: number,
  expanded: boolean,
  handleClick: () => void,
  areas: AreaProgress[]
}

const FlatCard = ({ flatNumber, bhkCount, expanded, handleClick, areas }: FlatCard) => {

  const [areasState, setAreasState] = useState(areas)
  useEffect(() => setAreasState(areas), [areas])

  const toggleAreaExpansion = useCallback((areaId: number) => {
    setAreasState(prev => prev.map(area => area.id === areaId ? { ...area, expanded: !area.expanded } : { ...area }))
  }, [])

  return (
    <div className="flat-card">

      <ProgressDetailHead handleClick={() => handleClick()} background section='flat' itemName={`${flatNumber} [${bhkCount}-BHK]`} />

      <div className={`flat-content ${expanded ? "block" : "hidden"}`}>
        {areasState.map((area, areaIndex) => (
          <AreaCard
            key={areaIndex}
            name={area.name}
            status={area.status}
            expanded={area.expanded || false}
            handleClick={() => toggleAreaExpansion(area.id)}
            lineItems={LINE_ITEMS_DUMMY.filter(lineItem => lineItem.area_id === area.id)}
          />
        ))}
      </div>

    </div>
  )
}

export default FlatCard