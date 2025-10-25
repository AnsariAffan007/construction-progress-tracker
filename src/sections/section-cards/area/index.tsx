import ProgressDetailHead from "@/components/common/progress-detail-head"
import "./styles.css"
import type { LineItem } from "@/types"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useProgressContext } from "@/ProgressContext"

interface AreaCard {
  areaId: number;
  name: string,
  status: boolean,
  expanded: boolean,
  handleClick: () => void,
  lineItems: LineItem[],
  checked: boolean,
  handleCheckedChange: () => void,
  setAreaCheckedOnItemsCheck: (areaId: number, items: Record<number, boolean>) => void
}

// #region MAIN
const AreaCard = ({ areaId, checked, handleCheckedChange, name, status, expanded, handleClick, lineItems, setAreaCheckedOnItemsCheck }: AreaCard) => {

  // Line item listing state
  const [lineItemsState, setLineItemsState] = useState(lineItems)
  // useEffect(() => setLineItemsState(lineItems), [lineItems])

  // Items checked local state
  const [itemsChecked, setItemsChecked] = useState(() => {
    const temp: Record<number, boolean> = {}
    lineItems.forEach(item => {
      temp[item.id] = item.status || false
    })
    return temp
  })

  // #region area-item sync
  // Area - Parent  |  Item - Child  (Both are in same current component)

  // Child to parent propagation (Items checking triggers area checked recalculation)
  const isFirstRender = useRef(true) // To prevent flat checking on first render
  useEffect(() => {
    if (!isFirstRender.current) setAreaCheckedOnItemsCheck(areaId, itemsChecked)
    isFirstRender.current = false;
  }, [itemsChecked, setAreaCheckedOnItemsCheck, areaId])

  // Parent to child propagation (Area checking triggers items checking logic)
  const setItemsCheckedOnAreaChange = useCallback((areaIdBeingChecked: number, areaChecked: boolean) => {
    if (areaIdBeingChecked !== areaId) return;
    setItemsChecked(prev => {
      const temp: Record<number, boolean> = {}
      Object.keys(prev).forEach(itemId => {
        temp[parseInt(itemId)] = areaChecked
      })
      return temp
    })
  }, [areaId])

  const { itemsCheckerOnAreaChange } = useProgressContext()
  useEffect(() => {
    itemsCheckerOnAreaChange.current[areaId] = setItemsCheckedOnAreaChange
  }, [itemsCheckerOnAreaChange, areaId, setItemsCheckedOnAreaChange])

  const { editing, handleItemSelectionsRef, itemFilter } = useProgressContext()

  // #region Save/Revert
  const handleItemSelections = useCallback((action: "save" | "cancel") => {
    if (action === "save") setLineItemsState(prev => prev.map(item => ({ ...item, status: itemsChecked[item.id] })))
    else {
      setItemsChecked(() => {
        const temp: Record<number, boolean> = {}
        lineItems.forEach(item => {
          temp[item.id] = item.status || false
        })
        return temp
      })
    }
  }, [itemsChecked, lineItems])
  useEffect(() => {
    handleItemSelectionsRef.current[areaId] = handleItemSelections
  }, [handleItemSelectionsRef, handleItemSelections, areaId])

  // #region Filtering
  const filteredItems = useMemo(() => {
    if (itemFilter.length === 0) return lineItemsState
    return lineItemsState.filter(item => item.name === itemFilter)
  }, [itemFilter, lineItemsState])

  // #region JSX
  return (
    <div className="area-card">

      <ProgressDetailHead
        handleClick={() => handleClick()}
        section='area'
        itemName={name}
        itemStatus={status}
        checked={checked}
        handleCheckedChange={handleCheckedChange}
      />

      <div className={`area-content ${expanded ? "expanded" : ""}`}>
        <table>
          <thead>
            <tr>
              <th className={`checkbox-col ${editing ? "block" : "hidden"}`}>Completed</th>
              <th>Line Item</th>
              <th>Planned Qty</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {filteredItems.map((lineItem, lineItemIndex) => (
              <tr key={lineItemIndex} className={`${lineItem.status && "completed opacity-60"}`}>
                <td className={`checkbox-col ${editing ? "block" : "hidden"}`}>
                  {lineItem.status
                    ? <span className="checkmark">✓</span>
                    : <input
                      type="checkbox"
                      className="checkbox"
                      onChange={() => setItemsChecked(prev => ({ ...prev, [lineItem.id]: !prev[lineItem.id] }))}
                      checked={itemsChecked[lineItem.id]}
                    />
                  }
                </td>
                <td>
                  {lineItem.status && <span className="checkmark">✓</span>}
                  {lineItem.name}
                </td>
                <td>{lineItem.planned_quantity}</td>
                <td>-</td>
                <td><span className="eye-icon">👁</span></td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>

    </div>
  )
}

export default AreaCard