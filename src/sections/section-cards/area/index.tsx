import ProgressDetailHead from "@/components/common/progress-detail-head"
import "./styles.css"
import type { LineItem } from "@/types"
import { useEffect, useState } from "react"
import { useProgressContext } from "@/ProgressContext"

interface AreaCard {
  name: string,
  status: boolean,
  expanded: boolean,
  handleClick: () => void,
  lineItems: LineItem[],
  checked: boolean,
  handleCheckedChange: () => void
}

const AreaCard = ({ checked, handleCheckedChange, name, status, expanded, handleClick, lineItems }: AreaCard) => {

  const [lineItemsState, setLineItemsState] = useState(lineItems)
  useEffect(() => setLineItemsState(lineItems), [lineItems])

  const { editing } = useProgressContext()

  const [itemsChecked, setItemsChecked] = useState(() => {
    const temp: Record<number, boolean> = {}
    lineItems.forEach(item => {
      temp[item.id] = item.checked || false
    })
    return temp
  })

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

      <div className={`area-content ${expanded ? "block" : "hidden"}`}>
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

            {lineItemsState.map((lineItem, lineItemIndex) => (
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