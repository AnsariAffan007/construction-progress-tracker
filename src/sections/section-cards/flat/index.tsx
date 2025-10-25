import ProgressDetailHead from "@/components/common/progress-detail-head"
import AreaCard from "../area"
import "./styles.css"
import type { AreaProgress } from "@/types"
import { useCallback, useEffect, useState } from "react"
import { LINE_ITEMS_DUMMY } from "@/data"
import { Activity } from "react"
import { useProgressContext } from "@/ProgressContext"

interface FlatCard {
  flatId: number;
  flatNumber: number,
  bhkCount: number,
  expanded: boolean,
  handleClick: () => void,
  areas: AreaProgress[],
  checked: boolean,
  handleCheckedChange: () => void,
  setFlatCheckedOnAreasCheck: (flatId: number, areas: Record<number, boolean>) => void
}

const FlatCard = ({ flatId, checked, handleCheckedChange, flatNumber, bhkCount, expanded, handleClick, areas, setFlatCheckedOnAreasCheck }: FlatCard) => {

  const [areasState, setAreasState] = useState(areas)
  // useEffect(() => setAreasState(areas), [areas])

  const toggleAreaExpansion = useCallback((areaId: number) => {
    setAreasState(prev => prev.map(area => area.id === areaId ? { ...area, expanded: !area.expanded } : { ...area }))
  }, [])

  const [areasChecked, setAreasChecked] = useState(() => {
    const temp: Record<number, boolean> = {}
    areas.forEach(area => {
      temp[area.id] = area.checked || false
    })
    return temp
  })

  const setAreasCheckedOnFlatCheck = useCallback((floorIdBeingChecked: number, flatChecked: boolean) => {
    if (floorIdBeingChecked !== flatId) return;
    setAreasChecked(prev => {
      const temp: Record<number, boolean> = {}
      Object.keys(prev).forEach(areaId => {
        temp[parseInt(areaId)] = flatChecked
      })
      return temp
    })
  }, [flatId])

  const { areasCheckerOnFlatChange } = useProgressContext()

  useEffect(() => {
    areasCheckerOnFlatChange.current[flatId] = setAreasCheckedOnFlatCheck
  }, [areasCheckerOnFlatChange, flatId, setAreasCheckedOnFlatCheck])

  useEffect(() => {
    setFlatCheckedOnAreasCheck(flatId, areasChecked)
  }, [setFlatCheckedOnAreasCheck, areasChecked, flatId])

  return (
    <div className="flat-card">

      <ProgressDetailHead
        handleClick={() => handleClick()}
        background
        section='flat'
        itemName={`${flatNumber} [${bhkCount}-BHK]`}
        checked={checked}
        handleCheckedChange={handleCheckedChange}
      />

      <Activity mode={expanded ? "visible" : "hidden"}>
        <div className={`flat-content`}>
          {areasState.map((area, areaIndex) => (
            <AreaCard
              key={areaIndex}
              name={area.name}
              status={area.status}
              expanded={area.expanded || false}
              handleClick={() => toggleAreaExpansion(area.id)}
              lineItems={LINE_ITEMS_DUMMY.filter(lineItem => lineItem.area_id === area.id)}
              checked={areasChecked[area.id] || false}
              handleCheckedChange={() => setAreasChecked(prev => ({ ...prev, [area.id]: !prev[area.id] }))}
            />
          ))}
        </div>
      </Activity>

    </div>
  )
}

export default FlatCard