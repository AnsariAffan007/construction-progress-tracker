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
  lineItems: LineItem[]
}

const AreaCard = ({ name, status, expanded, handleClick, lineItems }: AreaCard) => {

  const [lineItemsState, setLineItemsState] = useState(lineItems)
  useEffect(() => setLineItemsState(lineItems), [lineItems])

  const { editing } = useProgressContext()

  return (
    <div className="area-card">
      <ProgressDetailHead handleClick={() => handleClick()} section='area' itemName={name} itemStatus={status} />
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
                    : <input type="checkbox" className="checkbox line-item-checkbox" data-id="li12" data-area-id="kitchen103" />
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