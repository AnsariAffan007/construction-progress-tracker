import { useProgressContext } from "@/ProgressContext"
import "./styles.css"

interface ProgressDetailHead {
  itemName?: string,
  itemStatus?: boolean,
  handleClick: () => void,
  section: "floor" | "flat" | "area",
  background?: boolean,
  checked: boolean,
  handleCheckedChange: () => void
  totalItems: number;
  completedItems: number;
}

const ProgressDetailHead = ({
  itemName,
  itemStatus,
  handleClick,
  section,
  background,
  checked,
  handleCheckedChange,
  totalItems,
  completedItems
}: ProgressDetailHead) => {

  const { editing } = useProgressContext()

  return (

    <div className={`progress-detail ${section} ${background && "bg-[#fafafa]"} hover:bg-[#f5f5f5]`} onClick={handleClick}>

      <div className="progress-detail-left">

        <span className={`progress-checkbox-container ${editing ? "flex" : "hidden"}`}>
          <input type="checkbox"
            className={`progress-checkbox ${itemStatus ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            checked={checked && !itemStatus}
            onChange={() => handleCheckedChange()}
            onClick={e => e.stopPropagation()}
            disabled={itemStatus}
          />
        </span>
        <div className="progress-expand-trigger">
          {itemStatus && <span className="checkmark">✓</span>}
          <span>{itemName}</span>
        </div>

      </div>

      <div className='progress-info' style={{ cursor: "pointer" }}>
        <span className="progress-number">
          [{completedItems} / {totalItems}]
        </span>
        <span className={`progress-status-badge ${itemStatus ? "completed" : "pending"}`}>
          {itemStatus ? "Completed" : "Pending"}
        </span>
        <span className='chevron'>
          ▼
        </span>
      </div>

    </div>

  )
}

export default ProgressDetailHead