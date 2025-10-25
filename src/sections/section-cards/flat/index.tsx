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
  status: boolean
}

// #region MAIN
const FlatCard = ({ status, flatId, checked, handleCheckedChange, flatNumber, bhkCount, expanded, handleClick, areas, setFlatCheckedOnAreasCheck }: FlatCard) => {

  // Area Listing state
  const [areasState, setAreasState] = useState(areas)
  // useEffect(() => setAreasState(areas), [areas])

  // Area expansion toggler
  const toggleAreaExpansion = useCallback((areaId: number) => {
    setAreasState(prev => prev.map(area => area.id === areaId ? { ...area, expanded: !area.expanded } : { ...area }))
  }, [])

  // Areas checked local state
  const [areasChecked, setAreasChecked] = useState(() => {
    const temp: Record<number, boolean> = {}
    areas.forEach(area => {
      temp[area.id] = area.status || false
    })
    return temp
  })

  // #region flat-area sync
  // Flat - Parent (Current)  |  Area - child

  // Child to parent propagation (Areas checking triggering flat checked recalculation)
  useEffect(() => {
    setFlatCheckedOnAreasCheck(flatId, areasChecked)
  }, [setFlatCheckedOnAreasCheck, areasChecked, flatId])

  // Parent to child propagation (Flat checking triggers logic of areas checking)
  const setAreasCheckedOnFlatCheck = useCallback((flatIdBeingChecked: number, flatChecked: boolean) => {
    if (flatIdBeingChecked !== flatId) return;
    setAreasChecked(prev => {
      const temp: Record<number, boolean> = {}
      Object.keys(prev).forEach(areaId => {
        temp[parseInt(areaId)] = flatChecked
      })
      return temp
    })
  }, [flatId])

  const { areasCheckerOnFlatChange, saveAreaSelectionsRef } = useProgressContext()
  useEffect(() => {
    areasCheckerOnFlatChange.current[flatId] = setAreasCheckedOnFlatCheck
  }, [areasCheckerOnFlatChange, flatId, setAreasCheckedOnFlatCheck])

  // #region area-item sync
  // Area - Parent (Current)  |  Item - Child

  // Child to parent propagation (Items checking triggers area checked recalculation)
  const setAreaCheckedOnItemsCheck = useCallback((areaId: number, items: Record<number, boolean>) => {
    let isOneItemUnchecked: boolean = false;
    Object.values(items).forEach(itemChecked => {
      if (!itemChecked) isOneItemUnchecked = true
    })
    if (isOneItemUnchecked) setAreasChecked(prev => ({ ...prev, [areaId]: false }))
    else setAreasChecked(prev => ({ ...prev, [areaId]: true }))
  }, [])

  // Parent to child propagation (Area change triggers recalculation of items checked)
  const { itemsCheckerOnAreaChange } = useProgressContext()
  const handleAreaCheck = useCallback((areaId: number) => {
    let newCheckedVal: boolean
    setAreasChecked(prev => {
      newCheckedVal = !prev[areaId]
      return { ...prev, [areaId]: newCheckedVal }
    })
    // Check items
    setTimeout(() => itemsCheckerOnAreaChange.current?.[areaId]?.(areaId, newCheckedVal), 0)
  }, [itemsCheckerOnAreaChange])

  // #region Save selection
  const saveAreaSelection = useCallback(() => {
    setAreasState(prev => prev.map(area => ({ ...area, status: areasChecked[area.id] })))
  }, [areasChecked])
  useEffect(() => {
    saveAreaSelectionsRef.current[flatId] = saveAreaSelection
  }, [saveAreaSelectionsRef, saveAreaSelection, flatId])

  // #region JSX
  return (
    <div className="flat-card">

      <ProgressDetailHead
        handleClick={() => handleClick()}
        background
        section='flat'
        itemName={`${flatNumber} [${bhkCount}-BHK]`}
        checked={checked}
        handleCheckedChange={handleCheckedChange}
        itemStatus={status}
      />

      <Activity mode={expanded ? "visible" : "hidden"}>
        <div className={`flat-content`}>
          {areasState.map((area, areaIndex) => (
            <AreaCard
              key={areaIndex}
              areaId={area.id}
              name={area.name}
              status={area.status}
              expanded={area.expanded || false}
              handleClick={() => toggleAreaExpansion(area.id)}
              lineItems={LINE_ITEMS_DUMMY.filter(lineItem => lineItem.area_id === area.id)}
              checked={areasChecked[area.id] || false}
              handleCheckedChange={() => handleAreaCheck(area.id)}
              setAreaCheckedOnItemsCheck={setAreaCheckedOnItemsCheck}
            />
          ))}
        </div>
      </Activity>

    </div>
  )
}

export default FlatCard